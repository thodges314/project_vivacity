import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import request from 'supertest';

import connections from '../../src/routes/connections';
import jobs from '../../src/routes/jobs';
import skills from '../../src/routes/skills';

dotenv.config({ path: './.env' });

const app = express();

app.use(bodyParser.json());
app.use('/awesome/jobs', jobs);
app.use('/awesome/skills', skills);
app.use('/awesome/connections', connections);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, _request: Request, response: Response, _next: NextFunction) =>
    response.status(500).json({ error: error.message })
);

describe('/awesome/jobs', () => {
  it('GET /awesome/jobs', async () => {
    const res = await request(app).get('/awesome/jobs');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.status).toBe(200);
  });

  it('GET /awesome/jobs/:id', async () => {
    const res = await request(app).get('/awesome/jobs/1');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body.length).toBe(1);
    expect(res.body[0].start).toBe('DEC 2013');
    expect(res.status).toBe(200);
  });

  it('POST /awesome/jobs', async () => {
    const job = {
      company_name: 'ZORIN Industries',
      role: 'Software Engineer',
      description: "Make 'puter go beep beep boop boop",
      start_date: '3013-12-01',
      end_date: '3014-12-01',
    };
    const res = await request(app)
      .post('/awesome/jobs')
      .set('Content-type', 'application/json')
      .send(job);
    expect(res.status).toEqual(302);
    expect(res.get('Location')).toEqual('/awesome/jobs');
    const res2 = await request(app).get('/awesome/jobs');
    expect(res2.body[0].company_name).toEqual(job.company_name);
    expect(res2.body[0].role).toEqual(job.role);
  });

  it('POST /awesome/jobs/:id/newSkill', async () => {
    const new_skill = {
      skill: 'Java',
      description: 'Java is the best',
    };
    const res = await request(app)
      .post('/awesome/jobs/1/newSkill')
      .set('Content-type', 'application/json')
      .send(new_skill);
    expect(res.status).toEqual(302);
    expect(res.get('Location')).toEqual('/awesome/connections/jobs/1');
    const res2 = await request(app).get('/awesome/connections/jobs/1');
    expect(
      res2.body.map((skill: { skill_name: Text }) => skill.skill_name)
    ).toContain(new_skill.skill);
  });
});
