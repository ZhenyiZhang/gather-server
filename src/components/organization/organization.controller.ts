import { Controller,  Get, Body, Post, Param, Res, Req, HttpStatus, Request, UseGuards } from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {OrganizationService} from './organization.service';
import {CreateOrganizationDto} from './dto/create-organization.dto';
import {Response} from 'express';
import { CreateEventDto } from '../event/dto/create-event.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post('/sign-up')
  async create(@Body() createOrganization: CreateOrganizationDto, @Res() res: Response) {
     this.organizationService.create(createOrganization)
       .then(result => {res.send(result);})
       .catch(err => {res.status(HttpStatus.BAD_REQUEST).send(err)});
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/addEventException/:eventId')
  addEventException(@Request() req, @Param() param,@Res() res: Response, @Body() body) {
    /*after authorized using token*/
    this.organizationService.addEventException(req.user.userId, param.eventId, body.date)
        .then(result => {res.send(result);})
        .catch(err => {res.status(HttpStatus.BAD_REQUEST).send(err)});
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/newEvent')
  newEvent(@Request() req, @Res() res: Response, @Body() body) {
    const eventDto:CreateEventDto = {...body, Organization: req.user.userId};
    /*after authorized using token*/
    this.organizationService.newEvent(eventDto)
      .then(result => {res.send(result);})
      .catch(err => {res.status(HttpStatus.BAD_REQUEST).send(err)});
  }

  @Post('/verifyUserName')
  verifyUserName(@Res() res: Response, @Body() body) {
    this.organizationService.verifyUserName(body.userName, body.email)
        .then(() => {res.status(200).send()})
        .catch((err) => {
          res.statusMessage = err;
          res.status(403).end();});
  };

  @UseGuards(AuthGuard('jwt'))
  @Post('/updateProfile')
  async updateProfile(@Request() req, @Res() res: Response, @Body() body) {
    this.organizationService.updateProfile(req.user.userId, body)
        .then(result => {res.send(result);})
        .catch(err => {res.status(HttpStatus.BAD_REQUEST).send(err)});
  }


  @Get('/sharedProfile/:userId')
  async getSharedProfile(@Param() param, @Res() res: Response) {
    this.organizationService.getSharedProfile(param.userId)
      .then(result => {res.send(result);})
      .catch(err => {res.status(HttpStatus.BAD_REQUEST).send(err)});
  }

}