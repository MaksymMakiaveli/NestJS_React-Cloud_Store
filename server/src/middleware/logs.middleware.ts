import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogsMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    const now = Date.now();
    response.on('finish', () => {
      const { method, originalUrl, body, ip, params } = request;
      const { statusCode, statusMessage } = response;

      const bodyJson = JSON.stringify(body);
      const paramsJson = JSON.stringify(params);

      const message = `${ip} [${method}] ${originalUrl} ${statusCode} +${
        Date.now() - now
      } ${statusMessage} ${paramsJson.length > 2 ? paramsJson : ''} ${
        bodyJson.length > 2 ? bodyJson : ''
      }`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}
