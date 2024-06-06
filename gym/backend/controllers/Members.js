import { MemberModel } from "../models/MembersModel.js";
import { customError } from "../utils/CustomError.js";


export const addMember = async (req, res) => {
try {    
    const total = await MemberModel.find({})
    const newMember = await MemberModel.create({ ...req.body,rollNumber:total.length+100});
    res.json(newMember);
} catch (error) {
    next(customError(500,"Something is Wrong"))
}
}

export const Allmembers = async(req,res,next)=>{

    try {
        const members = await MemberModel.find({})
        res.json(members)
    } catch (error) {
        next(customError(500,"Something is Wrong"))
    }
}


export const feePaid = async(req,res,next)=>{

    try {
        const member = await MemberModel.findById(req.params.id);

        if (!member) return next(customError(404, "Member Not Found"));
        
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        member.feePaid = today;
        
        await member.save();
        
        res.json(member);
        
} catch (error) {
    next(customError(500,"Something is Wrong"))
}
}