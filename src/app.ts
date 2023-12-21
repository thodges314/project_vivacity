import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';

import applicant from './routes/applicant';
import connections from './routes/connections';
import jobs from './routes/jobs';
import skills from './routes/skills';

dotenv.config({ path: './.env' });

const app = express();
app.use(express.static('./public'));
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use('/awesome/jobs', jobs);
app.use('/awesome/skills', skills);
app.use('/awesome/connections', connections);
app.use('/awesome/applicant', applicant);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, _request: Request, response: Response, _next: NextFunction) =>
    response.status(500).json({ error: error.message })
);

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
