import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
      console.info(`Server is listening on port ${PORT}`);
      console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => {
    console.log("error:", err);
  });
