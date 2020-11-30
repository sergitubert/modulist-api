import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as csurf from 'csurf';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    credentials: true
  });

  // TODO: SET STORE IN REDIS
  const sessionConfig: session.SessionOptions = {
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    name: 'ml:session',
    cookie: { maxAge: 30 * 60 * 1000, sameSite: false },
  };

  if (process.env.NODE_ENV === "production") {
    app.set('trust proxy', 1);
    sessionConfig.cookie.secure = true;
    sessionConfig.cookie.httpOnly = true;
  }

  app.use(helmet());
  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(csurf());
  await app.listen(3001);
}
bootstrap();
