import { NextFunction, Request, Response, Router } from 'express';

import pool from '../../db';

const router = Router();

router.get('/', (_request: Request, response: Response, next: NextFunction) => {
  pool.query(
    'SELECT s.id, s.skill_name, s.description, TO_CHAR((SELECT SUM(AGE((CASE WHEN j.end_date IS NULL THEN NOW() ELSE j.end_date END), j.start_date)) FROM jobs AS j JOIN connections c ON j.company_name = c.job WHERE c.skill = s.skill_name), \'Y "Years" mm "Months"\') AS experience FROM skills s ORDER BY experience DESC, s.skill_name ASC',
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
      'SELECT s.skill_name, s.description, TO_CHAR((SELECT SUM(AGE(j.end_date, j.start_date)) FROM jobs AS j JOIN connections c ON j.company_name = c.job WHERE c.skill = s.skill_name), \'Y "Years" mm "Months"\') AS experience FROM skills s WHERE id = $1',
      [id],
      (err, res) => {
        if (err) return next(err);
        response.status(200).json(res.rows);
      }
    );
  }
);

router.post('/', (request: Request, response: Response, next: NextFunction) => {
  const { skill_name, description } = request.body;
  pool.query(
    'INSERT INTO skills (skill_name, description) VALUES ($1, $2) RETURNING *',
    [skill_name, description],
    (err, res) => {
      if (err) return next(err);
      response.redirect(`/awesome/skills/${res.rows[0].id}`);
    }
  );
});

router.put(
  '/:id',
  (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const keys = ['skill_name', 'description'];

    const fields: string[] = [];

    keys.forEach((key) => {
      if (request.body[key] !== undefined) fields.push(key);
    });

    fields.forEach((field, index) => {
      pool.query(
        `UPDATE skills SET ${field} = ($1) WHERE id = ($2)`,
        [request.body[field], id],
        (err) => {
          if (err) return next(err);
          if (index === fields.length - 1)
            response.redirect(`/awesome/skills/${id}`);
        }
      );
    });
  }
);

router.delete(
  '/:id',
  (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    pool.query(
      'DELETE FROM connections c WHERE c.skill = (SELECT s.skill_name FROM skills s WHERE s.id = ($1))',
      [id],
      (err) => {
        if (err) return next(err);
        pool.query('DELETE FROM skills WHERE id = ($1)', [id], (err) => {
          if (err) return next(err);
          response.redirect('/awesome/skills');
        });
      }
    );
  }
);

export default router;
