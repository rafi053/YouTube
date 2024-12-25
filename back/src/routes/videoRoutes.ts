import express from "express";

import  * as videoController  from "../controllers/videoController";



const router = express.Router();

router.post("/download", videoController.deleteVideo);

export default router;
