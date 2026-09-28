import express from "express";
const router = express.Router();
import memberController from "./controller/member.controller";

router.get("/", memberController.goHome);

export default router;