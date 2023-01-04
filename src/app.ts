import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import appRouter from './api/app.routes';
import ExposeMiddleware from './common/middleware/error-handler.middleware';
import customMorganLog from './config/morgan/custom-morgan-log';

const cors = require('cors');

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan(customMorganLog, { stream: Logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  bodyParser.raw({
    type: 'application/jwt',
  })
);

app.use(appRouter, ExposeMiddleware);

export default app;
