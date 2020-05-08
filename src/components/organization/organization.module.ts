import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import OrganizationSchema from '../../mongo/organization';
import {EventModule } from '../event/event.module';


@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Organization', schema: OrganizationSchema}]),
    EventModule],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [MongooseModule, OrganizationService]
})

export default class OrganizationModule{}