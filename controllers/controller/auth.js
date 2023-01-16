import bcrypt from "bcrypt";
import AsyncHandler from "express-async-handler";
import Jwt from "jsonwebtoken";

import User from "../models/User.js";

import { otpSend } from "../Services/nodeMailer.js";

export const sendOtp = async (req, res) => {
  try {
      const { 
          email
         } = req.body;


      console.log(req.body, 'fisrt emailllll');
      const emailExist = await User.findOne({ email: email });

      if (emailExist) {
          res.status(200).send({
              message: "Email already exist",
              success: false
          });
      } else {
          otpSend(email)
              .then((response) => {
                  console.log(response, 'kkkkkkkkkkkkkkkkkkkk');
                  res.status(200).send({
                      message: "OTP sent",
                      response: response,
                      success: true
                  });
              })
              .catch((err) => console.log("ERROR", err));
      }
  } catch (err) {
      console.log(err);
      res.status(500).send({ success: false });
  }
};
//register user

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      locations,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      locations,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// logging in

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(user){
      if(user.Active){
        if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "invalid credintials" });

    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
      }else{
        res.status(401).json({ status: 'inavalid password' })
      }
    }else{
      res.status(401).json({ status: 'user have been blocked' })
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 export const resetPassword = AsyncHandler(async (req, res) => {
  console.log("RESET PASSWORD CALL AT SERVER");
  const userId = req.params.id;
  const { password } = req.body;
  console.log(userId, "............", password);
  if (!userId || !password) {
    res.status(400);
    throw new Error("Please add all fields.");
  }
  const user = await User.findById(userId);
  console.log(user, "userrrrrrr11");
  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const updatedUser = await User.findByIdAndUpdate(userId, {
    $set: { password: hashedPassword },
  });
  console.log("user password updated");
  if (!updateUser) {
    res.status(400);
    throw new Error("Error updating user.");
  }
  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
});