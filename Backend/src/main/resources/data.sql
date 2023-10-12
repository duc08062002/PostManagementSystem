CREATE TABLE `authors` (
  `username` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100),
  `birth_date` date NOT NULL,
  `added` timestamp,
  PRIMARY KEY (`username`)
);

CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(30) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `content` text,
  `created_at` date,
  PRIMARY KEY (`id`)
);

INSERT INTO authors (username, password, first_name, last_name, email, birth_date, added) VALUES ('johnwick', '12345678', 'John', 'Wick', 'johnwick@gmail.com', DATE '2011-05-26', CURRENT_TIMESTAMP());
INSERT INTO authors (username, password, first_name, last_name, email, birth_date, added) VALUES ('tonystark', '12345678', 'Tony', 'Stark', 'tonystark@gmail.com', DATE '1970-05-29', CURRENT_TIMESTAMP());
INSERT INTO authors (username, password, first_name, last_name, email, birth_date, added) VALUES ('thomas', '12345678', 'Thomas', 'Shelby', 'thomasshelby@gmail.com', DATE '1890-05-24', CURRENT_TIMESTAMP());


INSERT INTO posts (author, title, description, content, created_at) VALUES ('johnwick', 'Manage data in Docker', 'How to use volume and bind mounts in Docker', 'How to use volume and bind mounts in Docker', DATE '2023-10-11');
INSERT INTO posts (author, title, description, content, created_at) VALUES ('johnwick', 'How to create a Docker image', 'Easy steps to build a Docker image with Dockerfile', 'Easy steps to build a Docker image with Dockerfile', DATE '2020-05-06');
INSERT INTO posts (author, title, description, content, created_at) VALUES ('tonystark', 'Docker overview', 'Docker is an open platform for developing, shipping, and running applications', 'Docker is an open platform for developing, shipping, and running applications', DATE '2020-04-24');
INSERT INTO posts (author, title, description, content, created_at) VALUES ('thomas', 'Use Docker Compose', 'Docker Compose is a tool that was developed to help define and share multi-container applications', 'Docker Compose is a tool that was developed to help define and share multi-container applications', DATE '2018-12-25');
INSERT INTO posts (author, title, description, content, created_at) VALUES ('johnwick', 'What can I use Docker for?', 'Fast, consistent delivery of your applications', 'Fast, consistent delivery of your applications', DATE '2016-11-05');
INSERT INTO posts (author, title, description, content, created_at) VALUES ('tonystark', 'Use Docker Compose', 'Docker Compose is a tool that was developed to help define and share multi-container applications.', 'Docker Compose is a tool that was developed to help define and share multi-container applications.', DATE '2023-06-08');
INSERT INTO posts (author, title, description, content, created_at) VALUES ('johnwick', 'Use bind mounts', 'Quick volume type comparisons', 'Quick volume type comparisons', DATE '2022-08-09');
INSERT INTO posts (author, title, description, content, created_at) VALUES ('tonystark', 'The Docker platform', 'Docker provides the ability to package and run an application in a loosely isolated environment', 'Docker provides the ability to package and run an application in a loosely isolated environment', DATE '2021-04-12');
INSERT INTO posts (author, title, description, content, created_at) VALUES ('thomas', 'ACI integration container features', 'Azure Container Instances: running single containers', 'Azure Container Instances: running single containers', DATE '2019-10-18');
INSERT INTO posts (author, title, description, content, created_at) VALUES ('tonystark', 'Docker development best practices', 'How to keep your images small', 'How to keep your images small', DATE '2017-09-17');
INSERT INTO posts (author, title, description, content, created_at) VALUES ('thomas', 'Best practices for writing Dockerfiles', 'This document covers recommended best practices and methods for building efficient images', 'This document covers recommended best practices and methods for building efficient images', DATE '2022-12-08');
INSERT INTO posts (author, title, description, content, created_at) VALUES ('johnwick', 'The Docker platform', 'Docker provides the ability to package and run an application in a loosely isolated environment', 'Docker provides the ability to package and run an application in a loosely isolated environment', DATE '2014-03-13');
INSERT INTO posts (author, title, description, content, created_at) VALUES ('thomas', 'What can I use Docker for?', 'Fast, consistent delivery of your applications', 'Fast, consistent delivery of your applications', DATE '2016-01-24');
