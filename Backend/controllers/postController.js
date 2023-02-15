const { default: mongoose } = require('mongoose')
const Post = require('../models/Posts')

//create new post
const createPost = async(req,res) =>{
    const {image,likes,date,username,description} = req.body

    try{
        const post = await Post.create({image,likes,date,username,description})
        res.status(200).json(post)
    }catch(error){
        res.sendStatus(400).json({error:error.message})
    }
}

//get posts
const getPost = async(req,res) =>{
    const post = await Post.find({}).sort({createdAt:-1})
    res.status(200).json(post)
}
//update

const likeposts = async (req,res) =>{
  console.log(req.body.email)
  try {
    const post = await Post.findById(req.params.id);
    console.log(req.body.email)
    if (!post.likes.includes(req.body.email)) {
      await post.updateOne({ $push: { likes: req.body.email } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.email } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}


const getPosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
    createPost,
    getPost,
    likeposts,
    getPosts
}