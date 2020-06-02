import { Controller, Get, Res, HttpStatus} from '@nestjs/common';
import {EventService} from './event.service';
import {Response} from 'express';

@Controller('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAll( @Res() res: Response) {
    this.eventService.getAll()
      .then(result => {res.send(result);})
      .catch(err => {res.status(HttpStatus.BAD_REQUEST).send(err)});
  }
}