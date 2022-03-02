<p align="center" style="display: flex; justify-content: center; gap: 1rem">
  <a href="http://nestjs.com/" target="blank">
  <img src="https://seeklogo.com/images/N/nestjs-logo-09342F76C0-seeklogo.com.png" height="100" alt="Nest Logo" />
  </a>
  <a href="http://nestjs.com/" target="blank">
  <img src="https://seeklogo.com/images/P/prisma-logo-3805665B69-seeklogo.com.png" height="100" alt="Prisma Logo" />
  </a>
  <a href="http://nestjs.com/" target="blank">
  <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" height="100" alt="Prisma Logo" />
  </a>
</p>

## Description
Backend test project in Nodejs using [Nest](https://github.com/nestjs/nest) and [Prisma](https://www.prisma.io/) for knowledgement demonstration.

## Installation

```bash
$ yarn install
```

## Create a data base with Docker (Optional)

```bash
$ docker-compose up -d
```

## Connect to Data Base

Create .env file in root directory of project and add **DATABASE_URL** environment variable with connection url string pointing to your data base. If you was run the previous step the .env file already has  the **DATABASE_URL** pointing to the docker container data base.

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## Usage

📋 [API Documentation](https://documenter.getpostman.com/view/6095710/UVksNFBm#3419a553-eb7c-476b-9b3b-48dd64c105cb)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [André Luís da Silva](https://www.linkedin.com/in/andre-luis-silva-a41005193/)

