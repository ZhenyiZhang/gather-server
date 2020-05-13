import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 5000;
  app.enableCors();
  app.listen(port).then(() => {console.log(`App is listening on port ${port}`)});
}

bootstrap();
