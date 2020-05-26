import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Organization} from './interface/organization.interface';
import {Event} from '../event/interface/event.interface';
import {CreateOrganizationDto} from './dto/create-organization.dto';
import {EventService} from '../event/event.service';
import {CreateEventDto} from '../event/dto/create-event.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel('Organization') private organizationModel: Model<Organization>,
    private eventService: EventService) {}

  /*get controller*/
  async getAll():Promise<any> {
    const organizationList: Organization[] =  await this.organizationModel.find();
    return organizationList.map((element: Organization) => {
      return {name: element.name, _id: element._id, description: element.description};
    });
  };

  /*post controller*/
  async create(CreateOrganization: CreateOrganizationDto):Promise<Organization> {
    const newOrganization = new this.organizationModel(CreateOrganization);
    newOrganization.setPassword();
    return newOrganization.save();
  };

  /*add new event to organization*/
  async newEvent(event: CreateEventDto) {
    const newEvent: CreateEventDto = await this.eventService.create(event);
    return this.organizationModel.update(
      {_id: newEvent.Organization},
      {$push:{events: newEvent._id}}
    );
  }

  /*user log in */
  async login(name: string, password: string):Promise<any>{
    const organization = await this.organizationModel.findOne({name: name});
    if(!organization){
      return {passwordError: false, usernameError: true}
    }
    if(organization.validatePassword(password)) {
      return { name: organization.name, _id: organization._id, passwordError: false, usernameError: false};
    }
    return {passwordError: true, usernameError: false}
  };

/*get profile for authorized user */
  async getProfile(userId: string) {
    return this.organizationModel.findById(userId);
  }

  /*delete event for authorized user */
  async deleteEvent(userId: string, eventId: string) {
    const updateOrganization = this.organizationModel.updateOne(
        {_id: userId },
        {$pull: {events: eventId}}
    );
    if(!updateOrganization) {
      return Promise.reject('event is not owned by user')
    }
    return this.eventService.deleteEvent(eventId);
  }

  /*update a event owned by user*/
  async updateEvent(userId: string, eventId: string, eventUpdateData: Event) {
    return this.eventService.updateEvent(userId, eventId, eventUpdateData);
  }

  async updateProfile(userId: string, update: Organization) {
    const newProfile = Object.assign({}, update);
    return this.organizationModel.updateOne(
        {_id: userId},
        {...newProfile}, {});
  }

  /*verify if user already exists*/
  async verifyUserName(userName: string) {
    const user = await this.organizationModel.findOne(
        {name: userName}
    );
    if (!user) {return Promise.resolve('ok');}
    return Promise.reject('User already exist')
  }

  async getSharedProfile(organizationId: string) {
    const organizationData = await this.organizationModel.findById(organizationId);
    if(!organizationData) return Promise.reject('The user does not exist');
    const organization: Organization = organizationData['_doc'];
    if(!organization.share) return Promise.reject('The user profile is not shared');
    const {password, salt, ...others} = organization;
    return others;
  }
}