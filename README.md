# AsyncAwait

A local development environment for working on the AsyncAwait platform. In order to use this environment you will need the following installed on your machine:

Node.js https://nodejs.org/en/

Docker https://www.docker.com/get-started

## Getting Started

### Installation

Running the commands below will allow you to spin up AsyncAwait

```sh
$ cd async-await-system
$ docker-compose up
```
Open a new terminal tab 
```sh
$ cd idea-service
$ npm install
$ npm start
```
Open a new tab 
```sh
$ cd async-await
$ npm install
$ ng serve 
```

### Ports 

MySql: http://localhost:3306 

Adminer Dashboard: http://localhost:8080

idea-service: http://localhost:3002

async-await: http://localhost:4200