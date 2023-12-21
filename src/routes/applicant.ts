import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (_request: Request, response: Response) => {
  response.status(200).sendFile('/public/applicant.html', { root: './' });
});

export default router;
