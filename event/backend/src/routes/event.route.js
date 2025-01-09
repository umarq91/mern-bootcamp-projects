import { Router } from 'express';
import {
    createEvent, getEvents, getSingleEvent, registerInEvent, getRegisteredEvents, deleteEvent, updateEvent, getRegisteredUsers, leaveEvent, getEventBySearch
} from '../controllers/event.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyAdmin } from '../middlewares/admin.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';



const router = Router();

router.route("/create").post(
    upload.fields([
        {
            name: "image", maxCount: 1
        }
    ]), createEvent);
router.route("/get").get(getEvents);
router.route("/event/:id").get(getSingleEvent);
router.route("/evt/:eventId/register/:userId").post(registerInEvent);
router.route("/getRegisteredEvents/:userId").get(getRegisteredEvents);
router.route("/delete/:id").delete(verifyToken, verifyAdmin, deleteEvent);
router.route("/update/:id").patch(verifyToken, verifyAdmin, upload.fields([
    {
        name: "image", maxCount: 1
    }
]), updateEvent);
router.route("/getRegisteredUsers/:eventId").get(getRegisteredUsers);
router.route("/evt/:eventId/leave/:userId").delete(leaveEvent);
router.route("/search").get(getEventBySearch);


export default router;