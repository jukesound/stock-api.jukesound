import express from "express";
const router = express.Router();

import { ItemController } from "controllers";

router.get("/", ItemController.all());
router.get("/:id", ItemController.get());
router.post("/", ItemController.post());
router.put("/:id", ItemController.update());
router.delete("/:id", ItemController.delete());

export default router;
