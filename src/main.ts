import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // TODO: SET STORE IN REDIS
  const sessionConfig: session.SessionOptions = {
    secret: 'my-secret',
    resave: false,
    name: 'session',
    cookie: { maxAge: 24 * 60 * 60 * 100 },
    saveUninitialized: false,
  };

  if (process.env.NODE_ENV === "production") {
    app.set('trust proxy', 1);
    sessionConfig.cookie.secure = true;
  }
  app.use(helmet());
  app.use(session(sessionConfig))
  await app.listen(3001);
}
bootstrap();
