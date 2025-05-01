import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as session from 'express-session';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UserModule);
  app.useStaticAssets(join(__dirname, '..', 'public')); 
  app.setBaseViewsDir(join(__dirname, '..', 'views'));   
  app.setViewEngine('hbs'); 
  hbs.registerHelper('eq', function (a, b) {
    return a === b;
  });
  hbs.registerHelper('includes', function(array, value) {
    if (!array) return false;
    if (Array.isArray(array)) {
      return array.includes(value);
    }
    return array === value;
  });

  app.use(
    session({
      secret: 'your-secret-key', // Change this to a strong secret
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false } // Set secure: true if using HTTPS
    })
  );
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
