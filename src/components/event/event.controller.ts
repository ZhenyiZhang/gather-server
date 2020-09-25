import { Controller, HttpStatus} from '@nestjs/common';
import {EventService} from './event.service';

@Controller('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
}