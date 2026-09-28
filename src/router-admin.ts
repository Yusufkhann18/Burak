import express from "express";
const router = express.Router();
import restaurantController from "./controller/restaurant.controller";

/** restaurant routes **/
router.get("/", restaurantController.goHome);

router
.get("/login", restaurantController.getLogin)
.post("/login", restaurantController.processLogin);

router
.get("/signup", restaurantController.getSignup)
.post("/signup", restaurantController.processSignup);

/** product routes **/
/** user routes **/

export default router;