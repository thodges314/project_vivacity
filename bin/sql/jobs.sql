CREATE TABLE jobs(
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(50) NOT NULL,
  role VARCHAR(70) NOT NULL,
  description VARCHAR(600) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE
);

CREATE TABLE skills(
  id SERIAL PRIMARY KEY,
  skill_name VARCHAR(50) NOT NULL,
  description VARCHAR(300) NOT NULL
);

CREATE TABLE connections(
  id SERIAL PRIMARY KEY,
  job VARCHAR(50) NOT NULL,
  skill VARCHAR(50) NOT NULL
);

----------------------------------------------------------------
INSERT INTO jobs(company_name, role, description, start_date, end_date)
VALUES
('CaliforniaMathTutor.com/TutorIllinois.com', 'Founder, Tutor, Web Developer', '* Used HTML5, CSS3 and PHP to create an SPA style page to advertise my tutoring services. * Used PHP to serve a different version of the page to Internet Explorer users such that it maintained the same
structure and function, but did not rely on CSS3. * Provided private tutoring sessions to local students in the topics of SAT/ACT prep, Advanced Calculus, Algebra 1
and 2, Pre-Calculus and Geometry. * Managed scheduling, invoicing, accounting, client acquisition and client retention.', '2013-12-01', '2017-06-01'),
('OpenThink Technology LLC', 'Developer - short term contract', '* Created a temporary page for the Santa Cruz City Schools to showcase Measure A & B Bonds. * Integrated work in HTML5, CSS3, flexbox, Bootstrap and PHP with the WordPress platform.', '2017-03-01', '2017-04-01'),
('Clear Capital', 'Software Engineer', '* Created an enterprise SAAS platform for real estate appraisers and lenders, with a team of developers using React, Redux, D3.js, webpack and Node.js. * Translated Angular code from an existing web app to understand paradigms needed during a rewrite in React. * Using D3, created most of the interactive, data-driven map and chart components used in the platform. These
visuals were effective at inciting client enthusiasm. * Integrated the Looker business intelligence platform into the platform.', '2017-06-01', '2019-10-01'),
('Hilton', 'Software Engineer', '* Updated and maintained an online hotel booking system for room counts of ten or more, with a team of developers using React (Next.js), TypeScript and GraphQL via Apollo. * Collaborated on programming for full A11y compliance. * Worked and collaborated with other developers fully remotely from Sacramento, California.', '2019-10-01', '2020-04-01'),
('AVB Marketing', 'Software Engineer', '* Worked on an online storefront service used by over 600 local furniture and appliance shops in USA and Canada. * Implemented Google Places Autocomplete API for address entry on checkout form. * Initiated and oversaw early stages of front-end internationalization effort and multilingual support. * Refactored portions of the app and converted these portions from JavaScript to TypeScript. * Advised heavily on the conversion from React to Next.js, including providing the primary overview of how that conversion should be done.', '2020-07-01','2021-12-02'),
('Cvent', 'Senior Software Engineer', '* Worked on a global online venue booking service for events and conferences built with Next.js, a popular React framework. * Rebuilt legacy portions for an updated interface with new features. * Refactored portions of the app and converted these portions from JavaScript to TypeScript. * Communicated with investors about developments and improvements in our app, fielding questions about
updates and improvements.', '2021-12-01', '2023-01-01'),
('Acxiom', 'Senior Data Visualization Engineer - project specific contract', '* Created a Data Visualization library with D3, Javascript and React to work in the Looker BI platform. * Implemented Storybook and advised the team on its use. * Refactored existing visualizations for performance, best coding practice and customizability. * Created a customizable Tooltip component, implemented through hooks, to be accessible by any visualization. * Implemented Material-UI app-wide.', '2023-06-01', '2023-09-01');

INSERT INTO skills(skill_name, description)
VALUES
('HTML', 'The foundational markup language for creating web pages.'),
('D3.js', 'A flexible Javascript framework for data visualization.'),
('Javascript', 'Beginning as a lightweight interpreted language for adding basic interactivity to web pages, Javascript grew to accomplish tasks much more elaborate than ever imagined.'),
('Looker', 'A BI dashboard framework, purchased by Google in 2020.'),
('Storybook', 'A tool to create, test and showcase components without running the entire app that they are being created for.'),
('React hooks', 'When react shifted from a component based OOP model to a more functional model, they implemented hooks to take the place of state and lifecycle methods.'),
('Material-UI', 'A popular formatting and visual component library created by google.'),
('React.js','The most popular library in use for creating reactive web apps.'),
('CSS3', 'The current iteration of the foundational formatting library for HTML.  It was created by interviewing magazine editors, and trying to duplicate the same principles.'),
('Next.js', 'A popular React framework with uses server-side rendering of components for increased performance and faster page-load times.'),
('SaaS', 'Software as a Service - This refers to apps run in the browser, and can be as simple as inventory lookup and ordering systems.'),
('TypeScript', 'An extension of Javascript written by Microsoft.  Typescript adds strict typing to Javascript, and transpiles to Javascript code.'),
('GraphQL', 'A query and mutation language for APIs created by Facebook.'),
('Docker', 'A platform designed for running applications in virualised environments customised for individual applications.  Docker can be used for scaling apps, by creating more Docker containers when needed.'),
('APIs', 'By using APIs, third-party applications, like mapping services, machine learning engines, autocomplete, and payment processing can be incorporated into webapps.'),
('A11y', 'Stands for "accessibility."  A11y has to do with making webapps accessable to blind, colorblind, hearing impared, and otherwise differently abled individuals.'),
('Internationalization', 'Setting up a webapp to automatically work around the world, by not only having translations automatically load, but also things like diffewrent number formats and measurement units.'),
('Apollo', 'A popular Javascript GraphQL server.'),
('Redux', 'A popular library for managing centralised application state.  Compared to useState, redux is more difficult to set up, but is better suited to the heavy lifrint of data-intensive applications.'),
('PHP', 'A scripting lanbguage for web development.  PHP runs on the server and serves up rendered HTML content to the client.'),
('webpack', 'A popular Javascript module bundler.'),
('Node.js', 'A javascript runtime environment for running JavaScript outside of the browser.  Node.js is popular both for backend page rendering, and for general purpose tasks including things that could be scripted in bash.'),
('SQL', 'A standardized database quering language.'),
('Angular.js', 'Competitor to React.js for building reactive web pages, made by Google.'),
('Bootstrap', 'A simplified formatting library for web pages that is basically a precursor to flexbox and Material UI.'),
('flexbox', 'A CSS paradigm for formatting pages with nested boxes taking up proportions of their parents in different arrangements.'),
('WordPress', 'A popular online blogging framework often used to make the web equivalent to a brosure to showcase static material.  One of the things keeping PHP alive.'),
('Git', 'A popular collaborative version-management system for teams working on projects together.'),
('Agile', 'A development methodology based on an iterative and incremental approach.'),
('Scrum', 'A particular implementation of the Agile methodology based on sprints, standups, grooming sessions, and so on.'),
('styled components', 'Lets you write CSS code in Javascript to make custom customisable versions of standard components.'),
('react-testing-library', 'A specialised testing library for react components.'),
('Jest', 'A generalised Javascript testling library.'),
('figma', 'A web interface design tool used for creating mockups.');

-- do WAY more ont his later
INSERT INTO connections(job, skill)
VALUES
('Acxiom', 'HTML'),
('Acxion', 'D3.js'),
('Acxiom', 'Javascript'),
('Acxiom', 'Looker'),
('Acxiom', 'Storybook'),
('Acxiom', 'React hooks'),
('Acxiom', 'Material-UI'),
('Acxiom', 'React.js'),
('Acxiom', 'CSS3'),
('Acxiom', 'Git'),
('Acxiom', 'Agile'),
('Acxiom', 'Scrum'),
('Acxiom', 'react-testing-library'),
('Acxiom', 'Jest'),
('Acxiom', 'figma'),
('Cvent', 'HTML'),
('Cvent', 'Next.js'),
('Cvent', 'React.js'),
('Cvent', 'SaaS'),
('Cvent', 'Javascript'),
('Cvent', 'TypeScript'),
('Cvent', 'GraphQL'),
('Cvent', 'CSS3'),
('Cvent', 'Apollo'),
('Cvent', 'Redux'),
('Cvent', 'React hooks'),
('Cvent', 'Git'),
('Cvent', 'Agile'),
('Cvent', 'Scrum'),
('Cvent', 'Material-UI'),
('Cvent', 'styled components'),
('Cvent', 'flexbox'),
('Cvent', 'react-testing-library'),
('Cvent', 'Jest'),
('Cvent', 'figma'),
('AVB Marketing', 'HTML'),
('AVB Marketing', 'CSS3'),
('AVB Marketing', 'Docker'),
('AVB Marketing', 'Graph QL'),
('AVB Marketing', 'Apollo'),
('AVB Marketing', 'Javascript'),
('AVB Marketing', 'TypeScript'),
('AVB Marketing', 'React.js'),
('AVB Marketing', 'Next.js'),
('AVB Marketing', 'APIs'),
('AVB Marketing', 'A11y'),
('AVB Marketing', 'Internationalization'),
('AVB Marketing', 'Git'),
('AVB Marketing', 'Agile'),
('AVB Marketing', 'Scrum'),
('AVB Marketing', 'Material-UI'),
('AVB Marketing', 'styled components'),
('AVB Marketing', 'flexbox'),
('AVB Marketing', 'React hooks'),
('AVB Marketing', 'Jest'),
('AVB Marketing', 'react-testing-library'),
('Hilton', 'Javascript'),
('Hilton', 'TypeScript'),
('Hilton', 'React.js'),
('Hilton', 'Next.js'),
('Hilton', 'GraphQL'),
('Hilton', 'CSS3'),
('Hilton', 'Apollo'),
('Hilton', 'Redux'),
('Hilton', 'HTML'),
('Hilton', 'A11y'),
('Hilton', 'Internationalization'),
('Hilton', 'SaaS'),
('Hilton', 'Storybook'),
('Hilton', 'Git'),
('Hilton', 'Agile'),
('Hilton', 'Scrum'),
('Hilton', 'Material-UI'),
('Hilton', 'styled components'),
('Hilton', 'flexbox'),
('Hilton', 'React hooks'),
('Hilton', 'Jest'),
('Hilton', 'react-testing-library'),
('Hilton', 'figma'),
('Clear Capital', 'HTML'),
('Clear Capital', 'CSS3'),
('Clear Capital', 'webpack'),
('Clear Capital', 'Node.js'),
('Clear Capital', 'D3.js'),
('Clear Capital', 'React.js'),
('Clear Capital', 'Redux'),
('Clear Capital', 'SQL'),
('Clear Capital', 'Angular.js'),
('Clear Capital', 'Looker'),
('Clear Capital', 'SaaS'),
('Clear Capital', 'Storybook'),
('Clear Capital', 'Git'),
('Clear Capital', 'Agile'),
('Clear Capital', 'Scrum'),
('Clear Capital', 'styled components'),
('Clear Capital', 'flexbox'),
('Clear Capital', 'figma'),
('OpenThink Technology LLC', 'Bootstrap'),
('OpenThink Technology LLC', 'HTML'),
('OpenThink Technology LLC', 'CSS3'),
('OpenThink Technology LLC', 'flexbox'),
('OpenThink Technology LLC', 'PHP'),
('OpenThink Technology LLC', 'WordPress'),
('OpenThink Technology LLC', 'Git'),
('CaliforniaMathTutor.com/TutorIllinois.com', 'HTML'),
('CaliforniaMathTutor.com/TutorIllinois.com', 'CSS3'),
('CaliforniaMathTutor.com/TutorIllinois.com', 'Javascript'),
('CaliforniaMathTutor.com/TutorIllinois.com', 'PHP');


