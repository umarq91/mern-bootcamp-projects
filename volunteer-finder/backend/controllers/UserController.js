import {UserModel} from "../models/UserModel.js"
import { customError } from "../utils/CustomError.js";
import bcrypt from 'bcrypt'

let  salt = bcrypt.genSaltSync(10)
export const userUpdate = async (req, res, next) => {
   
    if (req.user.id !== req.params.id) return next(customError(401, "You can only update Your Account"));

    try {

        let existingUser = await UserModel.find({ email: req.body.email })
    
        if (existingUser.length>0) {
          // If the email already exists, return an error response to the frontend
          return next(customError(404, 'Email already exists'));
        }
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, salt);
      }
  
      const userUpdated = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profile: req.body.profile,
          },
        },
        { new: true }
      );
      res.json({ message: "User Updated!" });
    } catch (error) {
      next(error);
    }
  };