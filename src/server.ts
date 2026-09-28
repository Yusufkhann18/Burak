import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";

console.log("MongoDB URL:", process.env.MONGODB_URI ? "TOPILDI" : "TOPILMADI");

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then((data) => {
    console.log(" MongoDB connection successful");
    const port = process.env.PORT || 3003;
    app.listen(port, function () {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
