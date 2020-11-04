import { Router } from 'express';

const router = Router();

router.get('/', function (request, response) {
    response.send('Surprise??? 👀');
});

export default router;
