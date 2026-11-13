import express from "express";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";
import memberController from "./controllers/member.controller";
import makeUploader from "./libs/utils/uploader";
const router = express.Router();

// Member
router.get("/member/restaurant", memberController.getRestaurant);
router.get("/member/top-users", memberController.getTopUsers);
router.post(
  "/member/update",
  memberController.verifyAuth,
  makeUploader("members").fields([
    { name: "memberImage", maxCount: 1 },
    { name: "MemberImage", maxCount: 1 },
  ]),
  (req, res, next) => {
    const files = req.files as { [field: string]: Express.Multer.File[] } | undefined;
    req.file = files?.memberImage?.[0] ?? files?.MemberImage?.[0];
    next();
  },
  memberController.updateMember,
);
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout,
);
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail,
);
// Product
router.get("/product/all", productController.getProducts);
router.get("/product/:id", memberController.retrieveAuth, productController.getProduct);

// Orders
router.post("/order/create", memberController.verifyAuth, orderController.createOrder);
router.get("/order/all", memberController.verifyAuth, orderController.getMyOrders);
router.post("/order/update", memberController.verifyAuth, orderController.updateOrder);
export default router;
