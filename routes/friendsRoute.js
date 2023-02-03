import express from "express";
import {
  accInvitations,
  getList,
  getRequests,
  getSentInv,
  getSuggestions,
  sendInvitations,
} from "../controller/FriendsController.js";

const router = express.Router();

//--------auth
router.get("/getSuggestions", getSuggestions);
router.get("/getSentInv", getSentInv);
router.get("/getRequests", getRequests);
router.get("/getList", getList);
router.put("/sendInvitations/:id", sendInvitations);
router.put("/accInvitations/:id", accInvitations);

export default router;
