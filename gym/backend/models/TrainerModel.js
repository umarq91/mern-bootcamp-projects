import mongoose, { Schema } from "mongoose";

const Trainer  = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    phone:{type:String},
    about:{type:String},
    monthlyFee:{type:Number},
},{
    timestamps:true
})

// _id to .id
const virtualId  = Trainer.virtual('id');
virtualId.get(function(){
    return this._id;
})

Trainer.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

export const TrainerModel = mongoose.model("Trainer",Trainer)

