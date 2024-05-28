import { Router } from "express";
import { userUpdate } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/userVerification.js";


const router = Router();

router.patch('/:id',verifyToken,userUpdate)

export default router