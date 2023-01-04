import express from 'express';

const v2Routes = express.Router();

v2Routes.get('/', (req, res, next) => {
  next('this is v2 routes');
});

export default v2Routes;
