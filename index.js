import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./config/index.js";
import taiKhoanRoute from "./routes/taiKhoanRoute.js";
import nhapDiemRoute from "./routes/nhapDiemRoute.js";
import LTCRoute from "./routes/LTCRoute.js";
import connectDB from "./database/index.js";

//connect
connectDB();

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors()); //cross site orgin resource sharing

app.use("/api/v1/taiKhoan", taiKhoanRoute);
app.use("/api/v1/LTC", LTCRoute);
app.use("/api/v1/nhapDiem", nhapDiemRoute);

app.listen(PORT, () => {
  console.log("Connect ", PORT);
});

// "build": "react-scripts build",
