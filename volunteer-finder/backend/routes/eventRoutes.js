import { Router } from "express";
import { createEvent, deleteEvent, eventPermission, getEventDetails, getEvents, getPersonalEvents, getPostsForAdmin, updateEvent } from "../controllers/EventControllers.js";
import { verifyToken } from "../middlewares/userVerification.js";
import { upload } from "../middlewares/multer.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { EventModel } from "../models/EventModel.js";
import { UserModel } from "../models/UserModel.js";


const router = Router();

router.get('/personal',verifyToken,getPersonalEvents).get('/admin',verifyToken,getPostsForAdmin)

router.get('/',getEvents)
.get('/:id',getEventDetails)
.post('/',verifyToken,createEvent)
.patch('/:id',updateEvent)
.delete('/:id',deleteEvent)

.put('/:id',verifyToken,eventPermission)

router.post('/upload',upload.single('thumbnail'),async(req,res,next)=>{
    const uploadedFiles = [];
    const files = req.file;
    console.log("one");
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No images were provided" });
    }
    const cloudinaryUrls = [];
    try {       
    //   for (const file of files) {
        const localPath = files.path;
        console.log(localPath);
  
        const cloudinaryUrl = await uploadOnCloudinary(localPath);
  
        if (cloudinaryUrl) {
          cloudinaryUrls.push(cloudinaryUrl);
        }
    //   }
    } catch (error) {
      console.log(error);
    }
  
    res.status(200).json(cloudinaryUrls);
})
export default router