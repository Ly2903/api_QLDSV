import express from "express";
import { CapNhatDiem } from "../controller/NhapDiemController.js";

const router = express.Router();

//--------auth
router.post("/capNhatDiem", CapNhatDiem);

export default router;
