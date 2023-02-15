const express = require('express')
const{
    createPost,
    getPost,
    likeposts,
    getPosts
} = require('../controllers/postController')
const requireAuth = require("../middleware/requireAuth")
const router = express.Router()

router.use(requireAuth)

//get all posts
router.get('/',getPost)
//post a post
router.post('/',createPost)
router.get('/:id',getPosts)
router.put('/:id/like',likeposts)



module.exports = router;

