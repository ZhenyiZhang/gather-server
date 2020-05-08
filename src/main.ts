import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  app.listen(port).then(() => {console.log(`App is listening on port ${port}`)});
}

bootstrap();
