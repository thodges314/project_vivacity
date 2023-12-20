import { NextFunction, Request, Response, Router } from 'express';

// import pgp from 'pg-promise';
import pool from '../db';

const router = Router();

router.get('/', (_request: Request, response: Response, next: NextFunction) => {
  pool.query(
    "SELECT id, company_name, role, TO_CHAR(start_date, 'MON YYYY') AS start, TO_CHAR(end_date,'MON YYYY') AS end,(CASE WHEN DATE_PART('Year', AGE((CASE WHEN end_date IS NULL THEN NOW() ELSE end_date END), start_date)) = 0 THEN TO_CHAR(AGE((CASE WHEN end_date IS NULL THEN NOW() ELSE end_date END), start_date), 'mm \"Months\"') ELSE TO_CHAR(AGE((CASE WHEN end_date IS NULL THEN NOW() ELSE end_date END), start_date), 'Y \"Years\" mm \"Months\"') END) AS duration FROM jobs ORDER BY start_date DESC",
    (err, res) => {
      if (err) return next(err);
      response.status(200).json(res.rows);
    }
  );
});

router.get(
  '/:id',
  (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    pool.query(
      "SELECT company_name, role, description, TO_CHAR(start_date, 'MON YYYY') AS start, TO_CHAR(end_date, 'MON YYYY') AS end,(CASE WHEN DATE_PART('Year', AGE((CASE WHEN end_date IS NULL THEN NOW() ELSE end_date END), start_date)) = 0 THEN TO_CHAR( AGE( (CASE WHEN end_date IS NULL THEN NOW() ELSE end_date END), start_date), 'mm \"Months\"') ELSE TO_CHAR(AGE((CASE WHEN end_date IS NULL THEN NOW() ELSE end_date END), start_date), 'Y \"Years\" mm \"Months\"') END) AS duration FROM jobs WHERE id=$1",
      [id],
      (err, res) => {
        if (err) return next(err);
        response.status(200).json(res.rows);
      }
    );
  }
);

router.post('/', (request: Request, response: Response, next: NextFunction) => {
  const { company_name, role, description, start_date, end_date } =
    request.body;
  pool.query(
    'INSERT INTO jobs (company_name, role, description, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [company_name, role, description, start_date, end_date],
    (err) => {
      if (err) return next(err);
      response.redirect('/awesome/jobs');
    }
  );
});

router.post(
  '/:id/newSkill',
  (request: Request, response: Response, next: NextFunction) => {
    const { skill, description } = request.body;
    const { id } = request.params;

    pool
      .query('INSERT INTO skills (skill_name, description) VALUES ($1, $2)', [
        skill,
        description,
      ])
      .then(() => {
        pool.query(
          'INSERT INTO connections(skill, job) VALUES (($1), (SELECT j.company_name FROM jobs j WHERE j.id=($2)))',
          [skill, id],
          (err) => {
            if (err) return next(err);
            response.redirect(`/awesome/connections/jobs/${id}`);
          }
        );
      });
  }
);

router.put(
  '/:id',
  (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const keys = [
      'company_name',
      'role',
      'description',
      'start_date',
      'end_date',
    ];

    const fields: string[] = [];

    keys.forEach((key) => {
      if (request.body[key] !== undefined) fields.push(key);
    });

    fields.forEach((field, index) => {
      pool.query(
        `UPDATE jobs SET ${field} = ($1) WHERE id = ($2)`,
        [request.body[field], id],
        (err) => {
          if (err) return next(err);
          if (index === fields.length - 1)
            response.redirect(`/awesome/jobs/${id}`);
        }
      );
    });
  }
);

router.delete(
  '/:id',
  (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    pool.query('DELETE FROM jobs WHERE id = ($1)', [id], (err) => {
      if (err) return next(err);
      response.redirect('/awesome/jobs');
    });
  }
);

export default router;
