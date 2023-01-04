import { Request, Response } from 'express';
import morgan from 'morgan';

const customMorganLog = (
  tokens: morgan.TokenIndexer<Request, Response>,
  req: Request,
  res: Response
) =>
  [
    tokens['remote-addr'](req, res),
    tokens['remote-user'](req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens.referrer(req, res),
    tokens['user-agent'](req, res),
    tokens['response-time'](req, res),
    'ms',
  ].join(' ');

export default customMorganLog;
