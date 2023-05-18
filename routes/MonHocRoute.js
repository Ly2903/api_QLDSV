import express from "express";
import { TaoMH } from "../controller/MonHocController.js";

const router = express.Router();

//--------auth
router.post("/TaoMH", TaoMH);
export default router;
