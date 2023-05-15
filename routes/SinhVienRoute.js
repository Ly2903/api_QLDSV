import express from "express";
import { TaoSV } from "../controller/SinhVienController.js";

const router = express.Router();

//--------auth
router.post("/TaoSV", TaoSV);
export default router;
