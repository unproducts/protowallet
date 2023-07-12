import { NextFunction, Request, Response } from 'express';

export const createBasicAuthMiddleware = (passPhrase: string | undefined) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!passPhrase) {
      // If passPhrase is not set, then we don't need to check for authorization
      next();
      return;
    }
    const auth = req.headers.authorization;
    if (!auth) {
      res.status(401).send('Unauthorized');
      return;
    }
    const isAuthorized = auth == passPhrase;
    if (!isAuthorized) {
      res.status(401).send('Unauthorized');
      return;
    }
    next();
  };
};
