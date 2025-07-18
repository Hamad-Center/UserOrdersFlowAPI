<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

---

## Docker setup
- ensure you have got docker installed and running successfully on your system.
- create a .env file with the same content of the provided .env.example file
- install the project using 
```npm run docker:up```

# Prisma Database Setup & Seeding Guide (Short Version)

## Prerequisites

- Docker & Docker Compose installed  
- NestJS project with Prisma  
- PostgreSQL service in `docker-compose.yml`

## Key Steps

### 1. Generate Prisma Client

```bash
docker-compose exec api npx prisma generate
```

Generates a type-safe client from `prisma/schema.prisma`.

### 2. Push Schema to DB

```bash
docker-compose exec api npx prisma db push
```

Syncs schema with PostgreSQL. Use for dev only.

### 3. Seed Database

```bash
docker-compose exec api npx prisma db seed
```

Runs `src/database/seed.ts` to insert sample data.

## Full Workflow

```bash
docker-compose up -d
docker-compose exec api npx prisma generate
docker-compose exec api npx prisma db push
docker-compose exec api npx prisma db seed
docker-compose exec api npx prisma studio
```

## Seed Output (Sample)

- 10 Users (INTERN, ADMIN, ENGINEER)
- 5 Classes
- 10 User-Class Assignments

## Common Issues

**DB URL Error:**  
Ensure `.env` has:  
```env
DATABASE_URL="postgresql://user:pass@pg:5432/db_name"
```

**Schema Not Found:**  
Check `prisma/schema.prisma` exists.

**Seed Errors:**  
Ensure Prisma Client is generated & seed script is valid.

## Done!

You now have a working database, schema, and test data. You're ready to develop.
> note that you have to execute the commands of migrations, database seeding inside the terminal
of docker container to resolve the error of '$DATABASE_URL NOT RESOLVED' as the database url is configured to use the docker container hostname (pg:5432)
> and if you executed the commands outside the docker container , it can't resolve the container name 'pg'.
---
## testing class validator on request payload
<img width="1718" height="1027" alt="image" src="https://github.com/user-attachments/assets/c590a6e9-611b-4dcd-bda2-77e708897e90" />

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">
  
<img width="1705" height="920" alt="image" src="https://github.com/user-attachments/assets/c5653a38-c8fe-42e2-96d7-501e92f931be" />
  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

<img width="1705" height="920" alt="image" src="https://github.com/user-attachments/assets/fb79aed1-2406-4c2a-8480-4129632b383a" />

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">
  
### roles can be in lowercase and still pass the validation , here is the validation of the name param if sent empty in the request payload

<img width="1708" height="962" alt="image" src="https://github.com/user-attachments/assets/acc9a5c5-b948-4d58-8c79-a02403817b4f" />

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

#### patching a name with a number to ensure validation using class validator 

<img width="1813" height="924" alt="image" src="https://github.com/user-attachments/assets/151dbe3a-710c-4142-9df2-36cf2f029be1" />

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

#### testing class validators for another endpoint to ensure that validation works successfully accross all other endpoints & make sure that the update user dto is successfully extending the validation decorators from the createUserDto

<img width="1813" height="924" alt="image" src="https://github.com/user-attachments/assets/9adfb2df-32ce-452d-af3e-61558f41a9c2" />

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

#### validating that if calling an endpoint of GET /users to an unregistered/a not found user 

<img width="1848" height="919" alt="image" src="https://github.com/user-attachments/assets/830d5808-1519-447e-ab22-0efdd8f16335" />
  
  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

#### validating GET request of 'role' as a query param in the endpoint - "/users?role=dave" -  to a name 


<img width="1482" height="936" alt="image" src="https://github.com/user-attachments/assets/74c714e9-97a2-4b64-80e7-2cfd7b835a65" />

---

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

