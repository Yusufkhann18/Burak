import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { LoginInput, Member, MemberInput } from "../libs/types/member";

import MemberService from "../model/Member.service";
import Errors from "../libs/Error";
const memberService = new MemberService();

//React
const memberController: T = {};
memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("body:", req.body);
    const input: MemberInput = req.body,
      result: Member = await memberService.signup(input);
    //TODO:TOKENS authentication

    res.json({ member: result });
  } catch (err) {
    console.error("Error signup page:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
    //res.json({member:err})
  }
};
memberController.login = async (req: Request, res: Response) => {
  try {
    const input: LoginInput = req.body,
      result = await memberService.login(input);
    //TODO:TOKENS authentication

    res.json({ member: result });
  } catch (err) {
    console.error("Error Login page:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
    //res.json({member:err})
  }
};

export default memberController;
