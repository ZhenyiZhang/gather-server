import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import EventSchema from '../../mongo/event';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Event', schema: EventSchema}])],
  controllers: [EventController],
  providers: [EventService],
  exports: [MongooseModule, EventService]
  }
)
export class EventModule {}