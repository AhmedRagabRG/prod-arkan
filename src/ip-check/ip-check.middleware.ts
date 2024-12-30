import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpCheckMiddleware implements NestMiddleware {
  private allowedIP = '197.161.91.10';

  use(req: Request, res: Response, next: NextFunction) {
    const clientIP = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    console.log(clientIP)
    if (clientIP === this.allowedIP) {
      next();
    } else {
      res.status(403).json({ message: 'Access Denied: Unauthorized IP' });
    }
  }
}
