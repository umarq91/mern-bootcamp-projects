import { Router } from "express";
import { createEvent, deleteEvent, getEvents, getPersonalEvents, updateEvent } from "../controllers/EventControllers.js";
import { verifyToken } from "../middlewares/userVerification.js";


const router = Router();


router.get('/',getEvents)
.post('/',createEvent)
.patch('/:id',updateEvent)
.delete('/:id',deleteEvent)
.get('/posts', verifyToken,getPersonalEvents)

export default router