import * as express from 'express'
import helmet from 'helmet'
import {
  ExpressMiddlewareInterface,
  Middleware,
} from 'routing-controllers-extended'
import { Service } from 'typedi'

@Service()
@Middleware({ type: 'before' })
export class SecurityMiddleware implements ExpressMiddlewareInterface {
  public use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    return helmet()(req, res, next)
  }
}
