import { Router, Request, Response } from 'express';
import express from 'express';
import { getSurprise, getStatistics } from '../services/surpriseService';
import asyncHandler from '../middlewares/asyncHandler';

const router = Router();
const toJSON = express.json();

router.post(
    '/get_surprise',
    toJSON,
    asyncHandler(async (req: Request, res: Response) => await getSurprise(req, res)),
);

router.post(
    '/get_statistics',
    toJSON,
    asyncHandler(async (req: Request, res: Response) => await getStatistics(req, res)),
);

export default router;
