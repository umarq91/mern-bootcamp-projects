import {Router} from "express";
import { addTrainer, getAllTrainer } from "../controllers/Trainer.js";
import { TrainerModel } from "../models/TrainerModel.js";


const router = Router()


router.get("/",getAllTrainer)
.post("/",addTrainer)



export default router