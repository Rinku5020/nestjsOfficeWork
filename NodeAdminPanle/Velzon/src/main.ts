import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UserModule);
  app.useStaticAssets(join(__dirname, '..', 'public')); 
  app.setBaseViewsDir(join(__dirname, '..', 'views'));   
  app.setViewEngine('hbs'); 

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
