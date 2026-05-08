# Tasks API

JWT-authenticated REST API for managing user tasks.

## Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Swagger UI

## Setup

```bash
npm install
npm start
```

`npm start` creates `.env` from `.env.example`.

## URLs

API:

```text
http://localhost:3000
```

Swagger docs:

```text
http://localhost:3000/api-docs
```

## Authentication

Protected routes require:

```text
Authorization: <token>
```
