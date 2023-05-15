import express from "express";
import {
  TaoLTC,
  getDSLTC,
  getDSNamHocTheoLTC,
} from "../controller/LTCController.js";

const router = express.Router();

//--------auth
router.get("/getDSLTC", getDSLTC);
router.post("/TaoLTC", TaoLTC); //getDSNamHocTheoLTC
router.get("/getDSNamHocTheoLTC", getDSNamHocTheoLTC); //
export default router;
