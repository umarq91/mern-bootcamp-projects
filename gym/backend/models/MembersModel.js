import mongoose, { Schema } from "mongoose";

const Member  = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    phone:{type:String},
    rollNumber:{type:Number},
    feePaid:{type:String},
},{
    timestamps:true
})

// _id to .id
const virtualId  = Member.virtual('id');
virtualId.get(function(){
    return this._id;
})

Member.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

export const MemberModel = mongoose.model("Member",Member)

