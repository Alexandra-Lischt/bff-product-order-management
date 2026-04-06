import { Params } from 'nestjs-pino';
import { randomUUID } from 'crypto';

export const loggerConfig: Params = {
  pinoHttp: {
    genReqId: (req: any): string =>
      (req.headers['x-correlation-id'] as string) || randomUUID(),

    customProps: (req: any) => ({
      userId: req.user?.sub || 'anonymous',
    }),

    redact: {
      paths: [
        'req.headers.authorization',
        'req.body.password',
        'req.body.confirmPassword',
        'req.body.token',
      ],
      censor: '[REDACTED]',
    },

    serializers: {
      req: (req: any) => ({
        id: req.id,
        method: req.method,
        url: req.url,
        query: req.query,
        remoteAddress: req.remoteAddress,
      }),
      res: (res: any) => ({
        statusCode: res.statusCode,
      }),
    },

    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
              singleLine: false,
            },
          }
        : undefined,

    customSuccessMessage: (req: any, res: any) =>
      `Request ${req.method} ${req.url} completed with ${res.statusCode}`,
    customErrorMessage: (req: any, res: any, err: Error) =>
      `Request ${req.method} ${req.url} failed with ${res.statusCode}: ${err.message}`,
  },
};
