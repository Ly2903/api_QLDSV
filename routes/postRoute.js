import express from "express";
import {
  createPost,
  getAllPost,
  getPost,
} from "../controller/PostController.js";

const router = express.Router();

//--------post
router.post("/createPost", createPost);
router.get("/getPosts", getPost);
router.get("/getAllPost", getAllPost);

export default router;
