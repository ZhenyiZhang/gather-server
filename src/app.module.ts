import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import OrganizationModule from './components/organization/organization.module';
import {AuthModule} from './components/auth/auth.module';
import {CacheModule} from './components/cache/cache.module';
import {ResetPasswordModule} from './components/auth/reset-password/reset-password.module'
import { MongooseModule } from '@nestjs/mongoose';
import EnvVariables from "./EnvVariables";


@Module({
  imports: [MongooseModule.forRoot(EnvVariables.DB_URL, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    }
  ),
    OrganizationModule, AuthModule, ResetPasswordModule, CacheModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
