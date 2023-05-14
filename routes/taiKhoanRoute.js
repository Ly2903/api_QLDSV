import express from "express";
import {
  TaoTaiKhoan,
  getDSTaiKhoan,
} from "../controller/TaiKhoanController.js";

const router = express.Router();

//--------auth
router.post("/taoTaiKhoan", TaoTaiKhoan);
router.post("/getDSTaiKhoan", getDSTaiKhoan);

export default router;
