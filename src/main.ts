import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 5000;
  const port = process.env.PORT || PORT;
  app.enableCors();
  app.listen(port).then(() => {console.log(`App is listening on port ${port}`)});
}

bootstrap();
