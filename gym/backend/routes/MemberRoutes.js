import {Router} from "express"
import { Allmembers, addMember, feePaid } from "../controllers/Members.js";

const router = Router();

router.post("/add-member",addMember)
.get("/",Allmembers)
.patch('/:id',feePaid)


export default router
