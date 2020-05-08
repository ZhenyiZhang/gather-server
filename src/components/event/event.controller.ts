import { Controller, Get, Body, Post, Param, Res, HttpStatus} from '@nestjs/common';
import {EventService} from './Event.service';
import {CreateEventDto} from './dto/create-Event.dto';
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