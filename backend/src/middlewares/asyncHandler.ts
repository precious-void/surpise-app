import { Request, Response, NextFunction } from 'express';

type Fn<T> = (request: Request, response: Response, next: NextFunction) => Promise<Response<T>>;
const asyncHandler = <T>(fn: Fn<T>) => (req: Request, res: Response, next: NextFunction): Promise<void | Response<T>> =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
