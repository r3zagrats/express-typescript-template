import express from 'express';
import testRouter from './test/test.routes';

const v1Routes = express.Router();

v1Routes.get('/', (req, res, next) => {
  next('this is v1 routes');
});

v1Routes.get('/test', testRouter);

export default v1Routes;
