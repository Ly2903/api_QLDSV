import express from "express";
import {
  TaoLTC,
  getDSLTC,
  getDSLTCTheoMaGV,
  getDSNamHocTheoLTC,
} from "../controller/LTCController.js";

const router = express.Router();

//--------auth
router.get("/getDSLTC", getDSLTC);
router.post("/TaoLTC", TaoLTC); //getDSNamHocTheoLTC
router.get("/getDSNamHocTheoLTC", getDSNamHocTheoLTC); //getDSLTCTheoMaGV
router.post("/getDSLTCTheoMaGV", getDSLTCTheoMaGV); //
export default router;
