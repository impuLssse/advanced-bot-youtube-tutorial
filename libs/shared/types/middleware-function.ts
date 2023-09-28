import { NextFunction } from 'express';
import { IContext } from './context';

export type MiddlewareFunction = (ctx: IContext, next: NextFunction) => Promise<void> | void;
