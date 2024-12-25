import express from "express";
import { videoController } from "../controllers/videoController.js";

const router = express.Router();

router.post("/download", videoController);

export default router;
