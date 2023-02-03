import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./config/index.js";
import userRouter from "./routes/userRoute.js";
import friendsRouter from "./routes/friendsRoute.js";
import postRouter from "./routes/postRoute.js";
import connectDB from "./database/index.js";

//connect
connectDB();

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors()); //cross site orgin resource sharing

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/friends", friendsRouter);

app.listen(PORT, () => {
  console.log("Connect ", PORT);
});

// "build": "react-scripts build",
