import express from "express";

import  * as videoController  from "../controllers/videoController";



const router = express.Router();

router.get("/download", videoController.getVideo);

export default router;
