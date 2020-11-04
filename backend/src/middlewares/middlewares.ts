import express from 'express';
import cors from 'cors';
import mainRoutes from '../routes';
import surpriseRoutes from '../Surprise/routes/surpriseRoutes';

const middleware = express();
const routes = [mainRoutes, surpriseRoutes];

export const middlewares = [
    middleware.use(
        cors({
            origin: 'http://localhost:3000',
        }),
    ),
    middleware.use(routes),
    middleware.use(express.json({ type: '*/*' })),
];
