import { Put, Get, Post, Res, Req, Request, Delete, Body, Param, Controller, HttpStatus, UseGuards } from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {OrganizationService} from './organization.service';
import {CreateOrganizationDto} from './dto/create-organization.dto';
import {CacheService} from '../cache/cache.service';
import {Response} from 'express';
import { CreateEventDto } from '../event/dto/create-event.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService, private cacheService: CacheService) {}

  @Post('/sign-up')
  async create(@Body() createOrganization: CreateOrganizationDto, @Res() res: Response) {
     this.organizationService.create(createOrganization)
       .then(result => {res.send(result);})
       .catch(err => {res.status(HttpStatus.BAD_REQUEST).send(err)});
  }

  /*get user profile and events data*/
  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async getProfile(@Request() req) {
    return this.organizationService.getProfile(req.user.userId);
  }

  /*update user profile*/
  @UseGuards(AuthGuard('jwt'))
  @Post('/profile')
  async updateProfile(@Request() req, @Res() res: Response, @Body() body) {
    if(this.cacheService.has('/profile/', req.user.userId)) {
      /*delete this user's cache data because it has been modified*/
      await this.cacheService.delete('/profile/', req.user.userId);
    }
    this.organizationService.updateProfile(req.user.userId, body)
      .then(result => {res.send(result);})
      .catch(err => {res.status(HttpStatus.BAD_REQUEST).send(err)});
  }

  /*add new event*/
  @UseGuards(AuthGuard('jwt'))
  @Post('/event')
  async newEvent(@Request() req, @Res() res: Response, @Body() body) {
    const eventDto:CreateEventDto = {...body, Organization: req.user.userId};
    if(this.cacheService.has('/profile/', req.user.userId)) {
      /*delete this user's cache data because it has been modified*/
      await this.cacheService.delete('/profile/', req.user.userId);
    }
    /*after authorized using token*/
    this.organizationService.newEvent(eventDto)
      .then(result => {res.send(result);})
      .catch(err => {res.status(HttpStatus.BAD_REQUEST).send(err)});
  }

  /*delete event*/
  @UseGuards(AuthGuard('jwt'))
  @Delete('/event/:eventId')
  async deleteEvent(@Request() req, @Param() param) {
    if(this.cacheService.has('/profile/', req.user.userId)) {
      /*delete this user's cache data because it has been modified*/
      await this.cacheService.delete('/profile/', req.user.userId);
    }
    return this.organizationService.deleteEvent(req.user.userId,  param.eventId);
  }

  /*modify event*/
  @UseGuards(AuthGuard('jwt'))
  @Put('/event/:eventId')
  async modifyEvent(@Request() req, @Param() param, @Body() eventUpdateData) {
    if(this.cacheService.has('/profile/', req.user.userId)) {
      /*delete this user's cache data because it has been modified*/
      await this.cacheService.delete('/profile/', req.user.userId);
    }
    return this.organizationService.updateEvent(req.user.userId,  param.eventId, eventUpdateData);
  }

  /*add event exceptions*/
  @UseGuards(AuthGuard('jwt'))
  @Post('/event/exception/:eventId')
  async addEventException(@Request() req, @Param() param,@Res() res: Response, @Body() body) {
    if(this.cacheService.has('/profile/', req.user.userId)) {
      /*delete this user's cache data because it has been modified*/
      await this.cacheService.delete('/profile/', req.user.userId);
    }
    /*after authorized using token*/
    this.organizationService.addEventException(req.user.userId, param.eventId, body.date)
        .then(result => {res.send(result);})
        .catch(err => {res.status(HttpStatus.BAD_REQUEST).send(err)});
  }
  
  /*check if a user name/email has been registered*/
  @Post('/verifyUserName')
  verifyUserName(@Res() res: Response, @Body() body) {
    this.organizationService.verifyUserName(body.userName, body.email)
        .then(() => {res.status(200).send()})
        .catch((err) => {
          res.statusMessage = err;
          res.status(403).end();});
  };

  /*get shared limited accessibility data*/
  @Get('/profile/shared/:userId')
  async getSharedProfile(@Param() param, @Res() res: Response) {
    this.organizationService.getSharedProfile(param.userId)
      .then(result => {res.send(result);})
      .catch(err => {res.status(HttpStatus.BAD_REQUEST).send(err)});
  }

}