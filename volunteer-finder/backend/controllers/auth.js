import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { customError } from "../utils/CustomError.js";
let salt = bcrypt.genSaltSync(10);
export const createUser = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    // check if username already exists
    let existingUser = await UserModel.find({ email })
    
    if (existingUser.length>0) {
      // If the email already exists, return an error response to the frontend
      return next(customError(404, 'Email already exists'));
    }

    let hashedpassword = bcrypt.hashSync(password, salt);

    const user = await UserModel.create({
      username,
      email,
      password: hashedpassword,
    });

    const { password: userPassword, ...rest } = user._doc;
    res.json({ success: "true", user:rest });
  } catch (error) {
    next(error);
  }
};


export const signIn = async (req, res, next) => {

    let { email, password } = req.body;
    try {
  
      let validUser = await UserModel.findOne({ email });
      // TODO : error Handling
      if (!validUser) return next(customError(400, "User not Found"));
      
     
  
      let validpassword = bcrypt.compareSync(password, validUser.password);
      if (!validpassword) return next(customError(401, "passord did not matched"));
      const { password: hashedpassword, ...rest } = validUser._doc;
  
      const token = jwt.sign({ id: validUser._id }, process.env.jwtSecret, {expiresIn: "1d"});
      
      res
        .cookie("token", token, {
          sameSite: "None",
          httpOnly: true,
          secure: true,
        })
        .json(rest);
    } catch (error) {
      next(error);
    }
  };
  

  
export const userVerification = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.jwtSecret, {}, async (err, usertoken) => {
      if (err) throw err;
      const { name, email, _id,isAdmin,addresses } = await UserModel.findById(
        usertoken.id
      );

      res.json({ name, email, _id,isAdmin,addresses });
    });
  }
};

export const userLogout = (req, res) => {

  console.log("Logout Req coming");
  res
    .clearCookie("token", { secure: true, httpOnly: true, sameSite: "none" })
    .send({ message: "Cookies Cleared Successfully" });
};