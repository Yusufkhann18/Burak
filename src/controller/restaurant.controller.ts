import { Request, Response } from "express";
import { T } from "../types/common";
import MemberService from "../models/Member.service";

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home page");
  } catch (error) {
    console.error("Error in goHome:", error);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login page");
  } catch (error) {
    console.error("Error in getLogin:", error);
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("Signup page");
  } catch (error) {
    console.error("Error in getSignup:", error);
  }
};

export default restaurantController;
