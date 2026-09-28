import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server muvaffaqiyatli ishlayapti!");
});

export default router;
