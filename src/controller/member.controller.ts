import { Request, Response } from "express";
import { T } from "../libs/types/common";

const memberController: T = {};

memberController.goHome = (req: Request, res: Response) => {
    res.send("Home page");
};

memberController.getLogin = (req: Request, res: Response) => {
    res.send("Login page");
};

memberController.getSignup = (req: Request, res: Response) => {
    res.send("Signup page");
};

export default memberController;