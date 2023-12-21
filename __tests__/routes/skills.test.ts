import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import request from 'supertest';

import skills from '../../src/routes/skills';

dotenv.config({ path: './.env' });

const app = express();

app.use(bodyParser.json());
app.use('/awesome/skills', skills);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, _request: Request, response: Response, _next: NextFunction) =>
    response.status(500).json({ error: error.message })
);

describe('awesome/skills', () => {
  it('GET /awesome/skills', (done) => {
    request(app)
      .get('/awesome/skills')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveLength(34);
        done();
      });
  });

  it('GET /awesome/skills/:id', (done) => {
    request(app)
      .get('/awesome/skills/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].skill_name).toBe('HTML');
        done();
      });
  });

  it('POST /awesome/skills', (done) => {
    const new_skill = {
      skill_name: 'Eating Bananas',
      description: "You know it's better to peel them from the base?",
    };
    request(app)
      .post('/awesome/skills')
      .set('Content-type', 'application/json')
      .send(new_skill)
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.get('location')).toBe('/awesome/skills');
        request(app)
          .get('/awesome/skills')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            expect(
              res.body.map((skill: { skill_name: String }) => skill.skill_name)
            ).toContain(new_skill.skill_name);
            done();
          });
      });
  });

  it('Put /awesome/skills/:id', (done) => {
    const new_skill = {
      skill_name: 'Disco Dancing',
    };
    request(app)
      .put('/awesome/skills/1')
      .set('Content-type', 'application/json')
      .send(new_skill)
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.get('location')).toBe('/awesome/skills/1');
        request(app)
          .get('/awesome/skills/1')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body[0].skill_name).toBe(new_skill.skill_name);
            done();
          });
      });
  });

  it('DELETE /awesome/skills/:id', (done) => {
    request(app)
      .delete('/awesome/skills/1')
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.get('location')).toBe('/awesome/skills');
        request(app)
          .get('/awesome/skills')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) return done(err);
            expect(
              res.body.find((skill: { id: number }) => skill.id === 1)
            ).toBeUndefined();
            done();
          });
      });
  });
});
