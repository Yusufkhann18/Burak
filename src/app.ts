import express from "express";
import "dotenv/config";
import { randomBytes } from "crypto";

import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";
import cookieParser from "cookie-parser";
const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGODB_URI),
  collection: "sessions",
});
/* 1.Entrance */
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));
/* 2.sessions */

app.use(
  session({
    secret: process.env.SESSION_SECRET || randomBytes(32).toString("hex"),
    cookie: {
      maxAge: 1000 * 3600 * 6, // 6 hours
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});
/* 3.views */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
/* 4.routers */
app.use("/admin", routerAdmin); //SSR
app.use("/", router); // SPA

export default app;
