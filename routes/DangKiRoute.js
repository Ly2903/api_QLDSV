import express from "express";
import { TaoSV } from "../controller/SinhVienController.js";
import { TaoDay } from "../controller/DayController.js";
import {
  TaoDangKi,
  capNhatDiem,
  getDSSVTheoMaLTC,
  getSVTheoMaSVAndMaLTC,
} from "../controller/DangKiController.js";

const router = express.Router();

//--------auth
router.post("/TaoDangKi", TaoDangKi);
router.post("/getDSSVTheoMaLTC", getDSSVTheoMaLTC); //getSVTheoMaSVAndMaLTC
router.post("/getSVTheoMaSVAndMaLTC", getSVTheoMaSVAndMaLTC); //capNhatDiem
router.post("/capNhatDiem", capNhatDiem); //
//
export default router;
