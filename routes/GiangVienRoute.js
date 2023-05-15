import express from "express";
import { TaoGV, getTTGVTheoMaGV } from "../controller/GiangVienController.js";

const router = express.Router();

//--------auth
router.post("/TaoGV", TaoGV); //getTTGVTheoMaGV
router.post("/getTTGVTheoMaGV", getTTGVTheoMaGV); //
export default router;
