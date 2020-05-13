import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import OrganizationModule from './components/organization/organization.module';
import {AuthModule} from './components/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRoot('mongodb://Bruce:ohcanada2020@ds041032.mlab.com:41032/events-manager', {
    connectionFactory: (connection) => {
      connection.plugin(require('mongoose-autopopulate'));
      return connection;
    },
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true }), OrganizationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
