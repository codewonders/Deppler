const express = require('express');
const router = express.Router();
const config = require('config');
const request = require('request');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

// IMPORT MODELS
const User = require('../../models/User')
const Posts = require('../../models/Posts')
const Profile = require('../../models/Profile')

// @route Get api/users
// @desc Test Routes
// @access Private


router.post('/' ,
	[
	  auth,
		[
			check('text', 'text is required').not().isEmpty(),
		]
	], 
	async (req,res) => {


	const errors = validationResult(req)
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()})
	}
	
	try{
		const user = await User.findById(req.user.id).select('-password');

		const newPost = new Post({
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: req.user.id
		})

		const post = await newPost.save();

		res.json(post)
	}
	catch(err){
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})

// @route Get api/posts
// @desc Get All Posts
// @access Private


router.get('/' ,auth, async (req,res) => {

	try{

		const posts = await Posts.find().sort({date: -1})

		res.json(posts)
	}
	catch(err){
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})

// @route Get api/posts/:id
// @desc Get Post By Id
// @access Private


router.get('/:id' ,auth, async (req,res) => {

	try{

		const posts = await Posts.findById(req.params.id);

		if(!posts){
			res.status(404).json({ msg: "Post Not Found"})
		}

		res.json(posts)
	}
	catch(err){
		console.error(err.message)
		if(err.kind === 'ObjectId'){
			res.status(404).json({ msg: "Post Not Found"})
		}
		res.status(500).send("Server Error")
	}
})

// @route Get api/posts/:id
// @desc Get Post By Id
// @access Private


router.delete('/:id' ,auth, async (req,res) => {

	try{

		const post = await Posts.findById(req.params.id);
		if(!post){
			return res.status(404).json({ msg: "Post Not Found"})
		}
		if(post.user.toString() !== req.user.id){
			return res.status(401).json({ msg: "User Not Authorized"})
		}
		await post.remove()
		res.json({msg: "Post Removed", id: req.params.id})
	}
	catch(err){
		console.error(err.message)
		if(err.kind === 'ObjectId'){
			res.status(404).json({ msg: "Post Not Found"})
		}
		res.status(500).send("Server Error")
	}
})

// @route Get api/users
// @desc Test Routes
// @access Private


router.put('/like/:id' ,auth, async (req,res) => {

	try{
		const posts = await Posts.findById(req.params.id);

		if(posts.likes.filter(like => like.user.toString()=== req.user.id).length > 0){
			return res.status(400).json({ msg: "Post Already Liked"})
		}
		
		posts.likes.unshift({user: req.user.id})

		await posts.save()
		res.json(posts.likes)
	}
	catch(err){
		console.error(err.message)
		if(err.kind === 'ObjectId'){
			res.status(404).json({ msg: "Id not correct"})
		}
		res.status(500).send("Server Error")
	}
})

// @route Get api/users
// @desc Test Routes
// @access Private


router.put('/unlike/:id' ,auth, async (req,res) => {

	try{
		const posts = await Posts.findById(req.params.id);

		if(posts.likes.filter(like => like.user.toString() === req.user.id).length === 0){
			return res.status(400).json({ msg: "Post Has Not Yet Been Liked"})
		}

		const removeIndex = posts.likes.map(like => like.user.toString()).indexOf(req.user.id)
		
		posts.likes.splice(removeIndex, 1)

		await posts.save()
		res.json(posts.likes)
	}
	catch(err){
		console.error(err.message)
		if(err.kind === 'ObjectId'){
			res.status(404).json({ msg: "Id not correct"})
		}
		res.status(500).send("Server Error")
	}
})


// @route Get api/users
// @desc Test Routes
// @access Private


router.post('/comment/:id' ,
	[
	  auth,
		[
			check('text', 'text is required').not().isEmpty(),
		]
	], 
	async (req,res) => {


	const errors = validationResult(req)
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()})
	}
	
	try{
		const user = await User.findById(req.user.id).select('-password');
		const posts = await Posts.findById(req.params.id);

		const newComment = {
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: req.user.id
		}

		posts.comments.unshift(newComment)

		await posts.save();

		res.json(posts.comments)
	}
	catch(err){
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})


// @route Get api/posts/:id
// @desc Get Post By Id
// @access Private


router.delete('/comment/:id/:comment_id' ,auth, async (req,res) => {

	try{

		const posts = await Posts.findById(req.params.id);

		const comments = posts.comments.find(comment => comment.id === req.params.comment_id)

		if(!comments){
			return res.status(404).json({ msg: "Comment Not Found"})
		}
		if(comments.user.toString() !== req.user.id){
			return res.status(401).json({ msg: "User Not Authorized"})
		}
		
		const removeIndex = posts.comments.map(comment => comment.user.toString()).indexOf(req.user.id)
		
		posts.comments.splice(removeIndex, 1)

		await posts.save()
		res.json(req.params.comments)
	}
	catch(err){
		console.error(err.message)
		if(err.kind === 'ObjectId'){
			res.status(404).json({ msg: "Post Not Found"})
		}
		res.status(500).send("Server Error")
	}
})
module.exports = router