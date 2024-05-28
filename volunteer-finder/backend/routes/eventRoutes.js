import { Router } from "express";
import { createEvent, deleteEvent, getEvents, getPersonalEvents, getPostsForAdmin, updateEvent } from "../controllers/EventControllers.js";
import { verifyToken } from "../middlewares/userVerification.js";


const router = Router();


router.get('/',getEvents)
.post('/',createEvent)
.patch('/:id',updateEvent)
.delete('/:id',deleteEvent)
.get('/posts', verifyToken,getPersonalEvents)
.get('/admin',verifyToken,getPostsForAdmin)

export default router