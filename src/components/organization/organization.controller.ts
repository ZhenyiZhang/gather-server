import { Controller, Get, Body, Post, Param, Res, Req, HttpStatus, Request, UseGuards } from '@nestjs/common';
import {OrganizationService} from './organization.service';
import {JwtAuthGuard} from '../auth/jwtAuthGuard';
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

  @UseGuards(JwtAuthGuard)
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
    this.organizationService.verifyUserName(body.userName)
        .then(() => {res.status(200).send()})
        .catch(() => {res.status(400).send()});
  };

  @UseGuards(JwtAuthGuard)
  @Post('/updateProfile')
  async updateProfile(@Request() req, @Res() res: Response, @Body() body) {
    this.organizationService.updateProfile(req.user.userId, body)
        .then(result => {res.send(result);})
        .catch(err => {res.status(HttpStatus.BAD_REQUEST).send(err)});
  }
  
  @Get()
  async getAll(@Res() res: Response) {
    this.organizationService.getAll()
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