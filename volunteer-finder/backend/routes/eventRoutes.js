import { Router } from "express";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../controllers/EventControllers.js";


const router = Router();


router.get('/',getEvents)
.post('/',createEvent)
.patch('/:id',updateEvent)
.delete('/:id',deleteEvent)

export default router