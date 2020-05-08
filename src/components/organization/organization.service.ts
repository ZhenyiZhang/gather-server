import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Organization} from './interface/organization.interface';
import {CreateOrganizationDto} from './dto/create-organization.dto';
import {EventService} from '../event/event.service';
import {CreateEventDto} from '../event/dto/create-event.dto';
import { runInNewContext } from 'vm';

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


  async getById(param):Promise<any> {
    const organization: Organization = await this.organizationModel.findById(param.id);
    const temp = Object.assign({}, organization['_doc']);
    const {password, salt, ...others} = temp;
    return others;
  }

  /*post controller*/
  async create(CreateOrganization: CreateOrganizationDto):Promise<Organization> {
    const newOrganization = new this.organizationModel(CreateOrganization);
    newOrganization.setPassword();
    return newOrganization.save();
  };

  async newEvent(event: CreateEventDto) {
    const newEvent: CreateEventDto = await this.eventService.create(event);
    return this.organizationModel.update(
      {_id: newEvent.Organization},
      {$push:{events: newEvent.Organization}}
    );
  }

  async login(name: string, password: string):Promise<any>{
    const organization = await this.organizationModel.findOne({name: name});
    if(organization.validatePassword(password)) {
      return { name: organization.name, _id: organization._id };
    }
    return null;
  };

}