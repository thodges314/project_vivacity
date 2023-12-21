import { NextFunction, Request, Response, Router } from 'express';

import pool from '../../db';

const router = Router();

router.get('/', (_request: Request, response: Response, next: NextFunction) => {
  pool.query(
    'SELECT c.id, j.role, j.company_name, c.skill FROM jobs j LEFT JOIN connections c ON j.company_name = c.job',
    (err, res) => {
      if (err) return next(err);
      response.status(200).json(res.rows);
    }
  );
});

router.get(
  '/skills',
  (_request: Request, response: Response, next: NextFunction) => {
    pool.query(
      'SELECT c.skill, j.company_name, j.role FROM connections c JOIN jobs J ON j.company_name = c.job ORDER BY c.skill DESC',
      (err, res) => {
        if (err) return next(err);
        response.status(200).json(res.rows);
      }
    );
  }
);

router.get(
  '/skills/:id',
  (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    pool.query(
      'SELECT j.company_name, j.role, j.description FROM connections c JOIN jobs J ON j.company_name = c.job JOIN skills s ON c.skill = s.skill_name WHERE s.id =($1) ORDER BY j.start_date DESC',
      [id],
      (err, res) => {
        if (err) return next(err);
        response.status(200).json(res.rows);
      }
    );
  }
);

router.get(
  '/jobs',
  (_request: Request, response: Response, next: NextFunction) => {
    pool.query(
      'SELECT j.company_name, j.role, c.skill FROM connections c JOIN jobs J ON j.company_name = c.job ORDER BY j.start_date DESC, c.skill',
      (err, res) => {
        if (err) return next(err);
        response.status(200).json(res.rows);
      }
    );
  }
);

router.get(
  '/jobs/:id',
  (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    pool.query(
      'SELECT s.skill_name, s.description FROM connections c JOIN jobs J ON j.company_name = c.job JOIN skills s ON c.skill = s.skill_name WHERE j.id = ($1) ORDER BY s.skill_name',
      [id],
      (err, res) => {
        if (err) return next(err);
        response.status(200).json(res.rows);
      }
    );
  }
);

router.get(
  '/:id',
  (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    pool.query(
      'SELECT c.id, j.role, j.company_name, j.start_date, j.end_date, c.skill, s.description FROM jobs j LEFT JOIN connections c ON j.company_name = c.job JOIN skills s ON s.skill_name = c.skill WHERE c.id=($1)',
      [id],
      (err, res) => {
        if (err) return next(err);
        response.status(200).json(res.rows);
      }
    );
  }
);

router.post('/', (request: Request, response: Response, next: NextFunction) => {
  const { job, skill } = request.body;
  pool.query(
    'INSERT INTO connections (job, skill) VALUES ($1, $2) RETURNING *',
    [job, skill],
    (err) => {
      if (err) return next(err);
      response.redirect('/awesome/connections');
    }
  );
});

router.delete(
  '/:id',
  (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    pool.query('DELETE FROM connections WHERE id = ($1)', [id], (err) => {
      if (err) return next(err);
      response.redirect('/awesome/connections');
    });
  }
);

export default router;
