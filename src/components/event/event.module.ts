import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './Event.controller';
import { EventService } from './Event.service';
import EventSchema from '../../mongo/Event';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Event', schema: EventSchema}])],
  controllers: [EventController],
  providers: [EventService],
  exports: [MongooseModule, EventService]
  }
)
export class EventModule {}