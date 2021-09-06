## About and Related Information

This is a basic CRUD implementation project using nest and mikro-orm. [Postman collection](https://github.com/imohitarora/nest-mikro-crud/blob/master/Allio.postman_collection.json) attached that should be used with the same.

## Installation

```bash
$ yarn install
```

Before starting the project please update the [project configuration file](https://github.com/imohitarora/nest-mikro-crud/blob/master/development.env) and [mikro-cli configuration values](https://github.com/imohitarora/nest-mikro-crud/blob/master/src/mikro-orm.config.ts) and run below command.

```bash
$ yarn mikro-orm schema:create -r
```


## Description

Created with  -- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

Available routes:

```
GET         /users        finds all users
GET         /users/:id    finds user by id
POST        /users        creates new user
PUT         /users/:id    updates user by id
DELETE      /users/:id    deletes user by id
```

This is a generics based project and I have tried to make crud operation inheritable. Please create your module and extend [BaseService](https://github.com/imohitarora/nest-mikro-crud/blob/master/src/base/base.service.ts) and [BaseController](https://github.com/imohitarora/nest-mikro-crud/blob/master/src/base/base.controller.ts) with it and you will be able to use it.

## License

Nest is [MIT licensed](LICENSE).
