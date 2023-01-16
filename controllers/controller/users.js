import User from "../models/User.js";
import Jwt from "jsonwebtoken";
// const mongoose = require('mongoose');
import mongoose from "mongoose";
/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
      const { id, friendId } = req.params
      const user = await User.findById(id)
      console.log(user,'heyy')
      const friend = await User.findById(friendId)
      console.log(id, friendId ,'jjjjjjjjjjjjjjjjjjjjjjjjjjjj');
      if (user.friends.includes(friendId)) {
        console.log('firsttttttttttttttttttt');
        console.log(user.friends,'hahhaha')
        user.friends = user.friends.filter((id) => id !== friendId)
        console.log(user.friends,'endi second')
          friend.friends = friend.friends.filter((id) => id !== id)
      } else {
        console.log('elseeeeeeeeeeeeeeeeeeeeeeeeeeee');
          user.friends.push(friendId);
          friend.friends.push(id);
      }
      await user.save();
      await friend.save();


      const friends = await Promise.all(
          user.friends.map((id) => User.findById(id))
      )
      const formattedFriends = friends.map(
          ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
          }
      );

      res.status(200).json(formattedFriends)

  } catch (err) {
      res.status(404).json({ message: err.message });
  }
}
export const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log( req.body,"Data Received")
   
  let { _id,
      firstName,
      lastName,
      location,
      picturePath,
      occupation } = req.body;
       req.body.picturePath = picturePath.slice(12,picturePath.length);

console.log(picturePath,'bhjchvjghkhghnvb')
      
console.log(req.body,'req.bodyreq.body');
  if (id === _id) {
      try {

          const user = await User.findByIdAndUpdate(id, req.body, {
              new: true,
          });
          const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);


          console.log({ user })
          res.status(200).json({ user, token, success: true, });
      } catch (error) {
          console.log(error, "Error ")
          res.status(400).json(error, 'hello');
      }
  } else {
      res
          .status(403)
          .json("Access Denied! You can update only your own Account.");
  }
};
//  (req, res) => {

 export const searchUser = async (req, res, next) => {
  try {
      let key = req.params.search
      console.log(key,'keykeykeykey');
      let searchKey = new RegExp(`/^${key}/i`)
      await User.aggregate([
          {
              $match: {
                  $or: [
                    { _id: { $regex: key, $options: 'si' } },
                    { picturePath: { $regex: key, $options: 'si' } },
                   
                      { firstName: { $regex: key, $options: 'si' } },
                      { lastName: { $regex: key, $options: 'si' } },
                  ]
              }
          },
          {
              $project: {
                   urId: 1,  picturePath: 1, firstName: 1, lastName: 1
              }
          }
      ]).then((user) => {
          res.status(201).json({ status: true, result: user, message: 'get search result' })
      }).catch((error) => {
          res.status(400).json({ status: false, message: 'some error' })
      })
  } catch (error) {

  }
}
// export const editprofilepic - async (req, res) ">(
//   const id reg.params.id;
//   1/ console.log("Data Received", req.body)
//   const picturepath
//   req.body;
//   try (
//   const user - await user. findByIdandupdate( id, req.body, (
//   new: true,
//   D:
//   const token - jwt. sign(( id: user.id ), process.env. JMt _ SECRET
//   console. log(f user ))
//   res.status (260). json( [ user, token, success: true ));
//   ) catch (error) (
//   console. log(error, "Error
//   res.status (400).jsonferror, 'hello');


export const editprofilepic=async (req, res) => {
  const id=req.params.id;
  console.log(id,'ididid');
  console.log(req.body,'ddddd');
  const picturePath=req.body;
  try {
    const user=await User.findByIdAndUpdate(id,req.body,{
      new: true,
    })
    const token=Jwt.sign({id:user.id},process.env.JWT_SECRET)
    res.status(200).json({user,token,success:true})
  } catch (error) {
    res.status(400).json(error,'error')
  }

}