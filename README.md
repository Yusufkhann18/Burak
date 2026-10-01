# BURAK

BURAK is a TypeScript web application built with Express, MongoDB, and Mongoose. It includes EJS-rendered restaurant pages and JSON endpoints for member signup and login.

## Features

- Member signup and login endpoints
- Password hashing with `bcryptjs`
- MongoDB persistence through Mongoose
- EJS pages for the restaurant/admin flow
- Static assets served from `public/`

## Requirements

- Node.js and npm
- A MongoDB connection string

## Getting Started

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/burak
PORT=3003
```

Replace `MONGODB_URI` with your MongoDB connection string. `PORT` is optional; the app uses `3003` when it is not set.

Start the development server:

```bash
npm run dev
```

Or run it without the file watcher:

```bash
npm start
```

After MongoDB connects successfully, open `http://localhost:3003/admin`. The HTTP server starts only after the database connection succeeds. If you configure a different `PORT`, use that port instead.

## Routes

| Method | Path            | Description                                                                                  |
| ------ | --------------- | -------------------------------------------------------------------------------------------- |
| `POST` | `/signup`       | Create a member account; accepts JSON with `memberNick`, `memberPhone`, and `memberPassword` |
| `POST` | `/login`        | Log in with JSON containing `memberNick` and `memberPassword`                                |
| `GET`  | `/admin`        | Render the admin home page                                                                   |
| `GET`  | `/admin/login`  | Render the admin login page                                                                  |
| `POST` | `/admin/login`  | Process admin login                                                                          |
| `GET`  | `/admin/signup` | Render the admin signup page                                                                 |
| `POST` | `/admin/signup` | Process admin signup                                                                         |

There are no `GET /` or `GET /login` routes. Opening those addresses in a browser returns `Cannot GET /` or `Cannot GET /login`. Use `POST /login` with a JSON body through an API client or frontend to submit login credentials.

The member API routes respond with JSON. Authentication token and session handling are not implemented yet.

## Project Structure

```text
src/
  controllers/   Request handlers
  libs/          Shared configuration, errors, enums, and types
  model/         Member service and business logic
  public/        CSS, images, and browser-side JavaScript
  schema/        Mongoose models
  views/         EJS templates
  app.ts         Express app setup
  router.ts      Member API routes
  router-admin.ts Admin page routes
  server.ts      Database connection and HTTP server
```

## Available Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm start`     | Start the server with `ts-node`   |
| `npm run dev`   | Start the server with `nodemon`   |
| `npm run train` | Run `src/train.ts` with `nodemon` |

The `npm test` script is currently a placeholder; no automated tests are configured.

The current `npm run build` command calls `extra.js`, which is missing. Production build setup must be completed before using `npm run build` and `npm run start:prod`.
