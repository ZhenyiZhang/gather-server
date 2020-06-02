import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import OrganizationModule from './components/organization/organization.module';
import {AuthModule} from './components/auth/auth.module';
import {ResetPasswordModule} from './components/auth/reset-password/reset-password.module'
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config({path: '/Users/zhenyizhang/Documents/Project.nosync/gather-server/process.env'});
const DB_URL = process.env.DB_URL;


@Module({
  imports: [MongooseModule.forRoot(DB_URL, {
    connectionFactory: (connection) => {
      connection.plugin(require('mongoose-autopopulate'));
      return connection;
    },
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true }), OrganizationModule, AuthModule, ResetPasswordModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
