import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import request from 'supertest';

import connections from '../../src/routes/connections';

dotenv.config({ path: './.env' });

const app = express();

app.use(bodyParser.json());
app.use('/awesome/connections', connections);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, _request: Request, response: Response, _next: NextFunction) =>
    response.status(500).json({ error: error.message })
);

describe('/awesome/connections', () => {
  it('GET /awesome/connections', (done) => {
    request(app)
      .get('/awesome/connections')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.header['content-type']).toBe(
          'application/json; charset=utf-8'
        );
        expect(res.body).toHaveLength(107);
        done();
      });
  });

  it('GET /awesome/connections/:id', (done) => {
    request(app)
      .get('/awesome/connections/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.header['content-type']).toBe(
          'application/json; charset=utf-8'
        );
        expect(res.body).toHaveLength(1);
        expect(res.body[0].id).toBe(1);
        expect(res.body[0].role).toBe(
          'Senior Data Visualization Engineer - project specific contract'
        );
        done();
      });
  });

  it('GET /awesome/connections/skills', (done) => {
    request(app)
      .get('/awesome/connections/skills')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveLength(107);
        expect(res.body[2].company_name).toEqual('Hilton');
        done();
      });
  });

  it('GET /awesome/connections/skills/:id', (done) => {
    request(app)
      .get('/awesome/connections/skills/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body[0].company_name).toEqual('Acxiom');
        done();
      });
  });

  it('GET /awesome/connections/jobs', (done) => {
    request(app)
      .get('/awesome/connections/jobs')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveLength(107);
        expect(res.body[0].company_name).toEqual('Acxiom');
        expect(res.body[0].skill).toEqual('Agile');
        done();
      });
  });

  it('GET /awesome/connections/jobs/:id', (done) => {
    request(app)
      .get('/awesome/connections/jobs/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body[0].skill_name).toEqual('CSS3');
        done();
      });
  });

  it('POST /awesome/connections', (done) => {
    const new_connection = {
      job: 'Acxiom',
      skill: 'Wordpress',
    };
    request(app)
      .post('/awesome/connections')
      .send(new_connection)
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.get('Location')).toEqual('/awesome/connections');
        request(app)
          .get('/awesome/connections')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toHaveLength(108);
            expect(
              res.body.filter(
                (connection: { company_name: String; skill: String }) =>
                  connection.company_name === 'Acxiom' &&
                  connection.skill === 'Wordpress'
              )
            ).toHaveLength(1);
            done();
          });
      });
  });

  it('DELETE /awesome/connections/:id', (done) => {
    request(app)
      .delete('/awesome/connections/1')
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.get('Location')).toEqual('/awesome/connections');
        request(app)
          .get('/awesome/connections')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toHaveLength(107);
            expect(
              res.body.filter(
                (connection: { id: number }) => connection.id === 1
              )
            ).toHaveLength(0);
            done();
          });
      });
  });
});
