import { TrainerModel } from "../models/TrainerModel.js";
import {customError} from "../utils/CustomError.js"

export const addTrainer = async (req,res) => {

    try {

        const newTrainer = await TrainerModel.create({...req.body})

        res.json(newTrainer)

    }catch (error) {
        console.log(error);
    }

}

export const getAllTrainer = async (req,res,next) => {

    try {
        const trainers = await TrainerModel.find({})
        res.json(trainers)
    } catch (error) {
        next(customError(500,"Something is Wrong"))
    }
}