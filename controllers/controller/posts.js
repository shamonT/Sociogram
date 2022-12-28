import Post from "../models/Post.js";
import User from "../models/User.js";

//create

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    console.log(userId,"bvgggfd");
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();

    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//read

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
//update
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = -post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// export const  commentPost= async(req,res)=>{
//   try {
//     console.log(req.body,'postsposts');
//     const postId=req.body.postId
//     console.log(postId,'postId');
//     const comments={
//        username:req.body.firstName,
//        comment: req.body.comment
       
//     }
//     await Post.updateOne({_id:postId},{
//       $push:{
//         comments
//       }
//     })
//     console.log(comments);
//   } catch (error) {
    
//   }
// }
export const commentPost = async (req, res) => {
  try {
      const { id } = req.params;
      const { description } = req.body;
      const post = await Post.findById(id);

      let commentUpdated = await post.updateOne({ $push: { comments: description } })

      const newCommentPost = await Post.findById(id);

      res.status(200).json(newCommentPost);

  } catch (err) {
      res.status(409).json({ message: err.message});
  }



}