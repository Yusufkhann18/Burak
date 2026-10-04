import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../model/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enums";
import { Message } from "../libs/Error";
import Errors from "../libs/Error";

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
    res.redirect("/admin");
  }
};
restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    res.render("signup");
  } catch (error) {
    console.error("Error  signup page:", error);
    res.redirect("/admin");
  }
};
restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;

    const result = await memberService.processSignup(newMember);
    //TODO:SESSIONS authentication
    req.session.member = result;
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    console.error("Error  processSignup page:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert('${message}'); window.location.replace('admin/signup')</script>`,
    );
  }
};
restaurantController.processLogin = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    const input: LoginInput = req.body;

    const result = await memberService.processLogin(input);
    //TODO:SESSIONS authentication
    req.session.member = result;
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    console.error("Error  processLogin page:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert('${message}'); window.location.replace('admin/login')</script>`,
    );
  }
};
restaurantController.logout = async (req: AdminRequest, res: Response) => {
  try {
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.error("Error  processLogin page:", err);
    res.redirect("/admin");
  }
};
restaurantController.checkout = async (req: AdminRequest, res: Response) => {
  try {
    if (req.session?.member)
      res.send(
        `<script>alert('Xush kelibsiz, ${req.session.member.memberNick}!');</script>`,
      );
    else res.send(`<script>alert('${Message.NOT_AUTHENTICATED}');</script>`);
  } catch (err) {
    console.error("Error  checkout page:", err);
    res.redirect("/admin");
  }
};

export default restaurantController;
