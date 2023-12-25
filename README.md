# Vivacity Project

### Thomas Hodges

## Project Setup

Assuming you have successfully downloaded the github project, navigate to the project directory, and usual, and run `npm i`.

Also, use `chmod` to set `+x` permission on `configuredb.sh` and `runTests.sh`.

I'm assuming you already have some familiarity with postgreSQL. To run this project, you'll need to create a new database called `jobsdb` and a user `vivacity_user` with password `secret`. If you are not comfortable using these settings, you can create your own user, and change the appropriate entries in the `.env` file. Normally, `.env` would not be uploaded to github, but I need to give you access.

Here are steps to use (I assume an existing user called 'postgres'):

        createdb -U postgres jobsdb

        psql -U postgres jobsdb

        CREATE USER vivacity_user WITH SUPERUSER PASSWORD 'secret';

Then use ctrl-d to exit.

If you have made it this far, you can run `npm run configure` from the project root. Then run `npm run dev`.

## Structure

![ERD]('ERD.png')

I created an `http://localhost:3000/awesome/applicant` endpoint, as requested. I had the return a basic landing page written in HTML, CSS and Bootstrap. Had I been creating a React project, I would have made something a bit more sophisticated, but I am mainly focused on the PostgreSQL components.

For all of the other endpoints, you can navigate to `GET` requests in your browser, or play with `POST`, `PUT` and `DELETE` requests in postman. They are made with basic HTTP requests with JSON payloads. The video pretty much gives you a rundown of everything, but I encourage you to play on your own. Look through `src/routes` to see what's available to you. Note that each file corresponds to the endpoint: `applicant.ts` is `/awesome/applicant`, `connections.ts` is `/awesome/connections`, etc.

There is no authentication being used except for the password protected access to PostgreSQL. Had I been creating a two-part system with a developed front-end, I would have used a token system.

All of the endpoints, except for `/awesome/applicant` return JSON. They look nice in the video because I have an browser extension to display JSON.

Testing is performed with `npm run testAll`. Because each test mutates the database entries, I wrote a bash script to run each `.test.ts` file separately, with the database being reset beforehand and after each file. I considered calling the config bash script using the `beforeAll()` hook, but I already had this running with bash so I just left it. If this were in production, we would have a separate prod database from the testing database, but for this project, I'm only using the one database.

## Challenges

Although I've worked on projects that use both SQL and GraphQL databases, I've never built one from the ground up, so I had to learn a bit about that first. Also, most jest tests I've written have been on front-end react components, so I had to learn how to test Express endpoints. Also, entering the data took quite some time.

## Additional Endpoints

My video was limited to two minutes, so I couldn't give a full tour. I'll list all endpoints here:

- GET `/awesome/applicant` : html landing page
- GET `/awesome/jobs` : JSON array of job id, company name, start date, end date and duration
- GET `/awesome/jobs/:id`: JSON for single job, identified by job id, with company name, role, description, start date, end date, duration
- POST `/awesome/jobs`: payload is {company_name, role_description, start_date, end_date}- end_date is optional: makes new entry for job in jobs table, redirects to `/awesome/jobs`
- POST `/awesome/jobs/:id/newSkill`: payload is {skill, description} : adds entry to skills table, links to job with `id` identifier, redirects to `/awesome/connections/job/:id`
- PUT `/awesome/jobs/:id`: payload is {company_name, role_description, start_date, end_date} - all entries are optional : makes changes to job with id of `id` and redirects to `/awesome/jobs/:id`
- DELETE `/awesome/jobs/id`: deletes job from table and redirects to `/awesome/jobs`
- GET `/awesome/skills`: get JSON array of all skills, with id, skill_name, description and experience - experience is calculated from start date and end date
- GET `/awesome/skills/:id`: get array of single JSON entry for skill with `id`, includes skill_name, description and experience - experience is calculated from start date and end date
- POST `/awesome/skills`: payload is {skill_name, description} : makes new entry for skill in skills table and redirects to `/awesome/skills/id` for the new skill.
- PUT `/awesome/skills/id`: payload is {skill_name, description} - all entries are optional: makes changes to skill with id of `id` and redirects to `/awesome/skills/id`
- GET `/awesome/connections`: performs a left join between jobs and connections and returns a JSON array with entries of connection id, role, company_name, skill (from connections).
- GET `/awesome/connections/:id`: performs a left join between jobs and connections, finds the single entry of id is `id` and returns connection id, role, company_name, skill (from connections).
- GET `/awesome/connections/skills`: performs a left join between jobs and connections and returns a JSON array with entries of connection id, role, company*name, skill (from connections) \_sorted by skill*.
- GET `/awesome/connections/skills/:id`: for skill with id of `id`, gets a table of jobs where that skill was used, sorted by start date. Entries are company_name, role, and description
- GET `/awesome/connections/jobs`: performs a left join between jobs and connections and returns a JSON array with entries of connection id, role, company*name, skill (from connections) \_sorted by job*.
- GET `/awesome/connections/jobs/:id`: for job with id of `id`, gets a table of skills used on that job, sorted by skill name. Entries are skill_name, and description
- POST `/awesome/connections`: payload is {job, skill}, where job corresponds to company name. Creates a new entry in the connections table linking the given job entry and the given skill name. Redirects to `/awesome/connections`.
- DELETE `/awesome/connections/:id`: deletes the entry from the connections table where the id is `id`.
