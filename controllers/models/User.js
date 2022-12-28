import mongoose, { Mongoose } from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: [mongoose.Schema.Types.ObjectId],
      ref:'User',
      default: [],
    },
    Active: {
      type: Boolean,
      default: true
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

export default User;
