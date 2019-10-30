const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const request = require('request');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

// IMPORT MODELS
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const Post = require('../../models/Posts')

// @route Get api/profile/me
// @desc get current user profile
// @asccess Private


router.get('/me', auth , async (req,res) => {
	try{
		const profile = await Profile.findOne({ user:req.user.id }).populate('user', ['name' , 'avatar'])
		if(!profile){
			res.status(400).json({msg: 'There Is No Profile For This User'})
		}
		res.json(profile)
	}
	catch(err){
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})

// @route Post api/profile/
// @desc Create or update user profile
// @asccess Private

router.post('/', 
	[
	  auth,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('skills', 'Skills is required').not().isEmpty()
		]
	], 
	async (req,res) => {


	const errors = validationResult(req)
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()})
	}

	const { 
		company,
		website,
		location,
		bio,
		status,
		githubusername,
		skills,
		youtube,
		facebook,
		twitter,
		instagram,
		linkedin
	} = req.body

	 // Build Profile Object
	 const profileFields = {}
	 profileFields.user = req.user.id
	 if(company) profileFields.company = company
	 if(website) profileFields.website = website
	 if(location) profileFields.location = location
	 if(bio) profileFields.bio = bio
	 if(status) profileFields.status = status
	 if(githubusername) profileFields.githubusername = githubusername
	 if(skills) {
	 	profileFields.skills = skills.split(',').map(skill => skill.trim());
	 }
	 
	 //Build Social
	 profileFields.social = {}
	 if(twitter) profileFields.social.twitter = twitter
	 if(facebook) profileFields.social.facebook = facebook
	 if(linkedin) profileFields.social.linkedin = linkedin
	 if(instagram) profileFields.social.instagram = instagram
	 if(youtube) profileFields.social.youtube = youtube

	try{

		let profile = await Profile.findOne({user: req.user.id})
		if(profile){
			// Update Profile
			profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new:true })
			return res.json(profile)
		}

		profile = new Profile(profileFields)

		await profile.save();

		res.json(profile)
		
	}catch (err){
		console.error(err.message);
		res.status(500).send("Server Error")
	}

})

// @route Get api/profile/
// @desc Get user profile
// @asccess Public

router.get('/' , async (req,res) => {
	try{
		const profiles = await Profile.find().populate('user', ['name' , 'avatar'])
		res.json(profiles)
	}
	catch(err){
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})


// @route Get api/profile/user/:user_id
// @desc Get a user profile by id
// @asccess Public

router.get('/user/:user_id' , async (req,res) => {
	try{
		const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name' , 'avatar'])
		
		if(!profile){
			return res.status(400).send("Profile Not Found")
		}
		res.json(profile)
	}
	catch(err){
		if(err.kind === 'ObjectId'){
			return res.status(400).send("Profile Not Found")
		}
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})


// @route Delete api/profile/
// @desc Delete user profile
// @asccess Private

router.delete('/' , auth , async (req,res) => {
	try{
		await Post.deleteMany({user: req.user.id})
		await Profile.findAndRemove({user: req.user.id})
		await User.findOneAndRemove({_id: req.user.id})
		res.json({msg: 'User Deleted'})
	}
	catch(err){
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})

// @route Put api/profile/experience
// @desc Add User Profile Experience
// @asccess Private

router.put('/experience' ,
	[
	  auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('company', 'Company is required').not().isEmpty(),
			check('from', 'From Date is required').not().isEmpty(),
		]
	], 
	async (req,res) => {


	const errors = validationResult(req)
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()})
	}
	const { 
		company,
		title,
		location,
		from,
		to,
		current,
		description
	} = req.body

	const newExp = {
		company,
		title,
		location,
		from,
		to,
		current,
		description
	}
	try{
		const profile = await Profile.findOne({user: req.user.id})
		
		profile.experience.unshift(newExp)

		await profile.save()

		res.json(profile)
	}
	catch(err){
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})

// @route Delete api/profile/experience/:id
// @desc Add User Profile Experience
// @asccess Private

router.delete('/experience/:id' , auth , async (req,res) => {
	try{
		const profile = await Profile.findOne({user: req.user.id})

		const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.id);

		profile.experience.splice(removeIndex , 1);
		await profile.save();
		res.json(profile)
	}
	catch(err){
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})




// @route Put api/profile/education
// @desc Add User Profile education
// @asccess Private

router.put('/education' ,
	[
	  auth,
		[
			check('fieldofstudy', 'Field of study is required').not().isEmpty(),
			check('degree', 'Degree is required').not().isEmpty(),
			check('school', 'School is required').not().isEmpty(),
			check('from', 'From Date is required').not().isEmpty(),
		]
	], 
	async (req,res) => {


	const errors = validationResult(req)
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()})
	}
	const { 
		fieldofstudy,
		degree,
		school,
		from,
		to,
		current,
		description
	} = req.body

	const newEdu = {
		fieldofstudy,
		degree,
		school,
		from,
		to,
		current,
		description
	}
	try{
		const profile = await Profile.findOne({user: req.user.id})
		
		profile.education.unshift(newEdu)

		await profile.save()

		res.json(profile)
	}
	catch(err){
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})

// @route Delete api/profile/education/:id
// @desc Add User Profile education
// @asccess Private

router.delete('/education/:id' , auth , async (req,res) => {
	try{
		const profile = await Profile.findOne({user: req.user.id})

		const removeIndex = profile.education.map(item => item.id).indexOf(req.params.id);

		profile.education.splice(removeIndex , 1);
		await profile.save();
		res.json(profile)
	}
	catch(err){
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})

// @route Delete api/profile/github/:username
// @desc get github User Profile 
// @asccess Public

router.get('/github/:username' , async (req,res) => {
	try{
		const option = {
			uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
			method:'GET',
			headers: {'user-agent': 'node.js'}
		};
		request(option, (error, response, body) => {
			if(error) console.error(error)

			if(response.statusCode !== 200){
				return res.status(404).json({msg: "No Github Repo Found"})
			}

			res.json(JSON.parse(body))
		})
	}
	catch(err){
		console.error(err.message)
		res.status(500).send("Server Error")
	}
})

module.exports = router;