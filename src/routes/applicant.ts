import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.get('/', (_request: Request, response: Response, next: NextFunction) => {
  response.status(200).sendFile('/public/applicant.html', { root: './' });
  // .send(
  //   '<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>'
  // );
});

export default router;
