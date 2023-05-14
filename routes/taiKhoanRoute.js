import express from "express";
import { TaoTaiKhoan } from "../controller/TaiKhoanController.js";

const router = express.Router();

//--------auth
router.post("/taoTaiKhoan", TaoTaiKhoan);

export default router;
