import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../model/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enums";
const memberService = new MemberService();
const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.render("home");
  } catch (error) {
    console.error("Error  home page:", error);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.render("login");
    // send | json |redirect | end | render
  } catch (error) {
    console.error("Error  login page:", error);
  }
};
restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    res.render("signup");
  } catch (error) {
    console.error("Error  signup page:", error);
  }
};
restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("body:", req.body);
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;

    const result = await memberService.processSignup(newMember);
    //TODO:SESSIONS authentication
    res.send(result);
  } catch (err) {
    console.error("Error  processSignup page:", err);
    res.send(err);
  }
};
restaurantController.processLogin = async (req: Request, res: Response) => {
  try {
    const input: LoginInput = req.body;

    const result = await memberService.processLogin(input);
    //TODO:SESSIONS authentication

    res.send(result);
  } catch (err) {
    console.error("Error  processLogin page:", err);
    res.send(err);
  }
};

export default restaurantController;
