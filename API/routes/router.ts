import express from "express";
import controller from "../controller/app.controller";
const router = express.Router();

router.delete("/:index", controller.deleteRecord);

router.put("/:index", controller.updateRecord);

router.post("/", controller.createRecord);

router.get("/:index", controller.readRecord);

export default router;
