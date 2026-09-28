
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";


const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.send("Home page");
    } catch (error) {
        console.error("Error in goHome:", error);
       
    }
};


restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.send("Login page");
    } catch (error) {
        console.error("Error in getLogin:", error);
       
    }
};


restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");

        res.send("Signup page");
    } catch (error) {
        console.error("Error in getSignup:", error);
       
    }
};


restaurantController.processLogin = (req: Request, res: Response) => {
    try {
        console.log("processLogin");
        res.send("DONE");
    } catch (error) {
        console.error("Error in processLogin:", error);
       
    }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log("processSignup");
        console.log("body:", req.body);


        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;



        const memberService = new MemberService();
        const result = await memberService.processSignup(newMember);

        res.send(result);

    } catch (error) {
        console.error("Error in processSignup:", error);
       res.send(error);
    }
};

export default restaurantController;