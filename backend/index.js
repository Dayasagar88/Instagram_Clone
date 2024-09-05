import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import postRoute from "./routes/post.route.js"
import { app, server } from "./socket/socket.js";
dotenv.config({});
import path from "path"
const PORT = process.env.PORT || 3000;


// app.get("/", (req, res) => {
//   return res.status(200).json({ message: "Backend Server", success: true });
// });


const __dirname = path.resolve();




//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOption = {
  origin: process.env.URL,
  credentials: true,
};
app.use(cors(corsOption));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/post", postRoute);


app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req,  res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})

server.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}.`);
});
