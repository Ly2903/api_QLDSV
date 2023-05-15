import express from "express";
import { TaoSV } from "../controller/SinhVienController.js";
import { TaoDay, getDSLTCTheoMaGV } from "../controller/DayController.js";

const router = express.Router();

//--------auth
router.post("/TaoDay", TaoDay);
router.post("/getDSLTCTheoMaGV", getDSLTCTheoMaGV);

export default router;
