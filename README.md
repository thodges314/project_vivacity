# Vivacity Project

### Thomas Hodges

## Project Setup

Assuming you have successfully downloaded the github project, navigate to the project directory, and usual, and run `npm i`.

Also, use `chmod` to set `+x` permission on `configuredb.sh` and `runTests.sh`.

I'm assuming you already have some familiarity with postgreSQL. To run this project, you'll need to create a new database called `jobsdb` and a user `vivacity_user` with password `secret`. If you are not comfortable using these settings, you can create your own user, and change the appropriate entries in the `.env` file. Normally, `.env` would uploaded to github, but I need to give you access.

Here are steps to use (I assume an existing user called 'postgres'):

    createdb -U postgres jobsdb
    psql -U postgres jobsdb
    CREATE USER vivacity_user WITH SUPERUSER PASSWORD 'secret';

Then use ctrl-d to exit.
If you have made it this far, you can run `npm run configure` from the project root. Then run `npm run dev`.

## Structure

I created an `http://localhost:3000/awesome/applicant` endpoint, as requested. I had the return a basic landing page written in HTML, CSS and Bootstrap. Had I been creating a React project, I would have made something a bit more sophisticated, but I am mainly focused on the PostgreSQL components.

For all of the other endpoints, you can navigate to `GET` requests in your browser, or play with `POST`, `PUT` and `DELETE` requests in postman. They are made with basic HTTP requests with JSON payloads. The video pretty much gives you a rundown of everything, but I encourage you to play on your own. Look through `src/routes` to see what's available to you. Note that each file corresponds to the endpoint: `applicant.ts` is `/awesome/applicant`, `connections.ts` is `/awesome/connections`, etc.

There is no authentication being used except for the password protected access to PostgreSQL. Had I been creating a two-part system with a developed front-end, I would have used a token system.

All of the endpoints, except for `/awesome/applicant` return JSON. They look nice in the video because I have an browser extension to display JSON.

Testing is performed with `npm run testAll`. Because each test mutates the database entries, I wrote a bash script to run each `.test.ts` file separately, with the database being reset beforehand and after each file. I considered calling the config bash script using the `beforeAll()` hook, but I already had this running with bash so I just left it. If this were in production, we would have a separate prod database from the testing database, but for this project, I'm only using the one database.

## Challenges

Although I've worked on projects that use both SQL and GraphQL databases, I've never built one from the ground up, so I had to learn a bit about that first. Also, most jest tests I've written have been on front-end react components, so I had to learn how to test Express endpoints. Also, entering the data took quite some time.
