import express from "express";
import { TaoLop, getDSLop } from "../controller/LopController.js";

const router = express.Router();

//--------auth
router.get("/getDSLop", getDSLop);
router.post("/taoLop", TaoLop);
export default router;
