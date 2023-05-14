import express from "express";
import { TaoLTC, getDSLTC } from "../controller/LTCController.js";

const router = express.Router();

//--------auth
router.get("/getDSLTC", getDSLTC);
router.post("/TaoLTC", TaoLTC);
export default router;
