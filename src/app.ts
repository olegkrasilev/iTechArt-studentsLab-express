import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { errorHandler } from './controllers/errorController/errorController';

import { AppError } from '@src/utils/appError';
import { router as userRouter } from '@src/routes/userRouter';

export const app = express();

// middlewares
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'TOo many request from this IP. PLease try again in an hour!',
});

app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/users', userRouter);

app.all('*', (request, response, next) => {
  next(new AppError(`Can't find ${request.url} on this website`, 404));
});

app.use(errorHandler);
