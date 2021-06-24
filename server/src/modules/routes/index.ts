import { Router } from 'express';
const router = Router();

import { refreshToken } from './refreshToken';
export const refreshTokenRouteHandler = refreshToken(router);
