import express from "express";
import {
  TaoSV,
  getDSSVChuaCoTK,
  getDSSVCoTK,
  getDSSVCoTKTheoMaLop,
} from "../controller/SinhVienController.js";

const router = express.Router();

//--------auth
router.post("/TaoSV", TaoSV); //getDDDSCoTK
router.get("/getDDDSCoTK", getDSSVCoTK); //
router.post("/getDSSVCoTKTheoMaLop", getDSSVCoTKTheoMaLop); //
router.get("/getDSSVChuaCoTK", getDSSVChuaCoTK); //
export default router;
