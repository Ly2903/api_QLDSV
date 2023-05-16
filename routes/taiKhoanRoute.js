import express from "express";
import {
  TaoTaiKhoan,
  XoaTaiKhoan,
  getDSTaiKhoan,
  getTKTheoMaTK,
  suaTaiKhoan,
} from "../controller/TaiKhoanController.js";

const router = express.Router();

//--------auth
router.post("/taoTaiKhoan", TaoTaiKhoan);
router.get("/getDSTaiKhoan", getDSTaiKhoan);
router.post("/getTKTheoMaTK", getTKTheoMaTK);
router.post("/suaTaiKhoan", suaTaiKhoan); //XoaTaiKhoan
router.post("/xoaTaiKhoan", XoaTaiKhoan); //XoaTaiKhoan

export default router;
