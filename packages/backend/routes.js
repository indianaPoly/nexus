import e from "express";
import { Controller } from "./controller.js";

const router = e.Router();
const controller = new Controller();

router.post("/data", controller.addData);
router.get("/all", controller.getAllData);
