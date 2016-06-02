# Node, Express, PostgreSQL, Sequelize, Redis

Experiment to build a scalable app and benchmark various architectures with New Relic

```
Install Postgres - http://exponential.io/blog/2015/02/21/install-postgresql-on-mac-os-x-via-brew/
```
```
npm install
```
```
npm install -g sequelize-cli
```
```
sequelize init
```
```
edit config/config.json with your Postgres username and password.
```
```
"development": {
    "username": "rob",
    "password": null,
    "database": "todos",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
},
```
```
sequelize db:create
```
```
sequelize db:migrate
```
```
npm start
```

visit http://localhost:3000

## Tutorials
http://mherman.org/blog/2015/10/22/node-postgres-sequelize/
