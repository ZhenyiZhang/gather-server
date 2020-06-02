import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Organization} from './interface/organization.interface';
import {OrganizationPopulate} from "./interface/organization.populate.interface";
import {Event} from '../event/interface/event.interface';
import {CreateOrganizationDto} from './dto/create-organization.dto';
import {EventService} from '../event/event.service';
import {CreateEventDto} from '../event/dto/create-event.dto';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectModel('Organization') private organizationModel: Model<Organization>,
        private eventService: EventService) {
    }

    /*create new account controller*/
    async create(CreateOrganization: CreateOrganizationDto): Promise<Organization> {
        const newOrganization = new this.organizationModel(CreateOrganization);
        newOrganization.setPassword();
        return newOrganization.save();
    };

    /*add new event to organization*/
    async newEvent(event: CreateEventDto) {
        const newEvent: CreateEventDto = await this.eventService.create(event);
        return this.organizationModel.updateOne(
            {_id: newEvent.Organization},
            {$push: {events: newEvent._id}}
        );
    }

    /*user log in */
    async login(name: string, password: string): Promise<any> {
        const organization = await this.organizationModel.findOneAndUpdate(
            {name: name},
            {login: true}
        );
        if (!organization) {
            return {passwordError: false, usernameError: true}
        }
        if (organization.validatePassword(password)) {
            return {name: organization.name, _id: organization._id, passwordError: false, usernameError: false};
        }
        return {passwordError: true, usernameError: false}
    };

    /*user log out and change log in field*/
    async logout(userId: string) {
      return this.organizationModel.findOneAndUpdate(
          {_id: userId},
          {login: false}
      );
    };

    /*get profile for authorized user */
    async getProfile(userId: string) {
        const organization: OrganizationPopulate = (await this.organizationModel.findById(userId))['_doc'];
        if(organization.login) return organization;
        return Promise.reject('user has logged out');
    };


    /*delete event for authorized user */
    async deleteEvent(userId: string, eventId: string) {
        const updateOrganization = this.organizationModel.findOneAndUpdate(
            {_id: userId},
            {$pull: {events: eventId}}
        ).catch(err => {console.log(err)});
        if (!updateOrganization) {
            return Promise.reject('event is not owned by user')
        }
        return this.eventService.deleteEvent(eventId);
    }

    /*update a event owned by user*/
    async updateEvent(userId: string, eventId: string, eventUpdateData: Event) {
        return this.eventService.updateEvent(userId, eventId, eventUpdateData);
    }

    /*update user profile*/
    async updateProfile(userId: string, update: Organization) {
        const newProfile = Object.assign({}, update);
        return this.organizationModel.updateOne(
            {_id: userId},
            {...newProfile}, {});
    }

    /*get data for creating reset password jwt token*/
    async getResetPasswordInfo(email: string) {
        const organization: Organization = await this.organizationModel.findOne({email: email});
        if (!organization) {
            return Promise.reject('The email is not registered')
        }
        return {email: email};
    }


    /*verify if user already exists*/
    async verifyUserName(userName: string, email: string) {
        const user = await this.organizationModel.findOne(
            {name: userName}
        );
        const userEmail = await this.organizationModel.findOne(
            {email: email}
        );
        if (!user && !userEmail) {
            return Promise.resolve('ok');
        }
        if(user) return Promise.reject('User already exist');
        if(userEmail) return Promise.reject('Email has been registered');
    }

    async resetPassword(password: string, email: string) {
        const organization: Organization = await this.organizationModel.findOne({email: email});
        const organizationData: CreateOrganizationDto = {...organization, password: password};
        const organizationUpdate = new this.organizationModel(organizationData);
        organizationUpdate.setPassword();
        return this.organizationModel.update({email: email},
            {
                password: organizationUpdate.password,
                salt: organizationUpdate.salt
            });
    }

    /*get data for user shared link*/
    async getSharedProfile(organizationId: string) {
        const organizationData = await this.organizationModel.findById(organizationId);
        if (!organizationData) return Promise.reject('The user does not exist');
        const organization: OrganizationPopulate = organizationData['_doc'];
        if (!organization.share) return Promise.reject('The user profile is not shared');
        const {password, salt, ...others} = organization;
        return others;
    }

    /*delete one time of a repeated events*/
    async addEventException(organizationId: string, eventId: string, date: Date) {
        const organization: OrganizationPopulate = (await this.organizationModel.findById(organizationId))['_doc'];
        const filteredEvent = organization.events.filter((event: Event) => {
           return event._id == eventId;
        });
        if(filteredEvent.length === 0) return Promise.reject('The event does not owned by the user');
        return this.eventService.addEventException(eventId, date);
    }
}