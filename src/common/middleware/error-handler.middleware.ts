/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { InternalServerException } from '../custom/custom-error';

const ExposeMiddleware = (
  data: Error | HttpError | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(data instanceof Error) || !(data instanceof HttpError)) {
    res.status(200).send({
      code: 200,
      isSuccess: true,
      data,
    });

    return;
  }

  let exposeError: HttpError;
  if (!(data instanceof HttpError) || !data.expose) {
    exposeError = InternalServerException();
  } else {
    exposeError = data;
  }

  res.status(exposeError.statusCode).send({
    code: exposeError.statusCode,
    isSuccess: false,
    errorMessage: exposeError.message,
  });
};

export interface ExposeResponse {
  code: number;
  isSuccess: true | false;
  data?: any;
  errorMessage?: string;
}

export default ExposeMiddleware;
