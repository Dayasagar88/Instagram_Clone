import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import postRoute from "./routes/message.route.js"
dotenv.config({});

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Backend Server", success: true });
});

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/user", messageRoute);
app.use("/api/v1/user", postRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}.`);
});
