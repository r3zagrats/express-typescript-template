import express from 'express';

const testRouter = express.Router();

testRouter.get('/test', (req, res, next) => {
  next('ok');
});

export default testRouter;
