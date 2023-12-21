import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express from 'express';
import request from 'supertest';

import connections from '../../src/routes/connections';
import jobs from '../../src/routes/jobs';

dotenv.config({ path: './.env' });

const app = express();

app.use(bodyParser.json());
app.use('/awesome/jobs', jobs);
app.use('/awesome/connections', connections);

describe('/awesome/jobs', () => {
  it('GET /awesome/jobs', (done) => {
    request(app)
      .get('/awesome/jobs')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.header['content-type']).toBe(
          'application/json; charset=utf-8'
        );
        expect(res.body).toHaveLength(7);
        done();
      });
  });

  it('GET /awesome/jobs/:id', (done) => {
    request(app)
      .get('/awesome/jobs/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.header['content-type']).toBe(
          'application/json; charset=utf-8'
        );
        expect(res.body).toHaveLength(1);
        expect(res.body[0].start).toBe('DEC 2013');
        done();
      });
  });

  it('POST /awesome/jobs', (done) => {
    const job = {
      company_name: 'ZORIN Industries',
      role: 'Software Engineer',
      description: "Make 'puter go beep beep boop boop",
      start_date: '3013-12-01',
      end_date: '3014-12-01',
    };
    request(app)
      .post('/awesome/jobs')
      .set('Content-type', 'application/json')
      .send(job)
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.get('Location')).toEqual('/awesome/jobs');
        request(app)
          .get('/awesome/jobs')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body[0].company_name).toBe(job.company_name);
            expect(res.body[0].role).toEqual(job.role);
            done();
          });
      });
  });

  it('POST /awesome/jobs/:id/newSkill', (done) => {
    const new_skill = {
      skill: 'Standups',
      description: 'Standups are number 1',
    };
    request(app)
      .post('/awesome/jobs/1/newSkill')
      .set('Content-type', 'application/json')
      .send(new_skill)
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.get('Location')).toEqual('/awesome/connections/jobs/1');
        request(app)
          .get('/awesome/connections/jobs/1')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            expect(
              res.body.map((skill: { skill_name: String }) => skill.skill_name)
            ).toContain(new_skill.skill);
            done();
          });
      });
  });

  it('Put /awesome/jobs/:id', (done) => {
    const job = {
      company_name: 'Apeture Labs',
      role: 'Test Subject',
    };
    request(app)
      .put('/awesome/jobs/1')
      .send(job)
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.get('Location')).toEqual('/awesome/jobs/1');
        request(app)
          .get('/awesome/jobs/1')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body[0].company_name).toBe(job.company_name);
            expect(res.body[0].role).toBe(job.role);
            done();
          });
      });
  });

  it('DELETE /awesome/jobs/:id', (done) => {
    request(app)
      .delete('/awesome/jobs/1')
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.get('Location')).toEqual('/awesome/jobs');
        request(app)
          .get('/awesome/jobs')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            expect(
              res.body.find((job: { id: number }) => job.id === 1)
            ).toBeUndefined();
            done();
          });
      });
  });
});
