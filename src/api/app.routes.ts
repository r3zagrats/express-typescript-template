import express from 'express';
import v1Routes from './v1/index.routes';
import v2Routes from './v2/index.routes';

const appRouter = express.Router();

appRouter.use('/api/v1', v1Routes);

appRouter.use('/api/v2', v2Routes);

export default appRouter;
