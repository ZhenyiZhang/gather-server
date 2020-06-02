import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Event} from './interface/event.interface';
import {CreateEventDto} from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel('Event') private EventModel: Model<Event>) {
  }

  async create(CreateEvent: CreateEventDto):Promise<Event> {
    const newEvent = new this.EventModel(CreateEvent);
    return newEvent.save();
  };

  async getAll():Promise<Event[]> {
    return this.EventModel.find();
  };

  async deleteEvent(id: string):Promise<any> {
    return this.EventModel.deleteOne({_id: id});
  };

  async addEventException(eventId: string, date: Date) {
    console.log(date);
    return this.EventModel.findOneAndUpdate(
        {_id: eventId},
        {$push: {repeatExceptions: new Date(date)}},
    );
  };

  async updateEvent(userId: string, eventId: string, updateEventData: Event) {
    return this.EventModel.findOneAndUpdate(
        {_id: eventId, Organization: userId},
        {$set: {...updateEventData}},
        );
  };
}