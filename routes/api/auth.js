const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

// IMPORT MODELS
const User = require('../../models/User')

// @route Get api/users
// @desc Test Routes


router.get('/', auth , async (req,res) => {
  try{
  	const user = await User.findById(req.user.id).select('-password');
  	res.json(user)
  }catch(err){
  	res.status(500).json('Server Error')
  }
})

// @route Post api/auth
// @desc Authenticate User
// @access Public

router.post('/', [
		check('email', 'Email is required').isEmail(),
		check('password', 'Please enter a password with 6 or more character').exists(),
	], 
	async (req,res) => {


	const errors = validationResult(req)
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()})
	}

	const { email , password } = req.body

	try{

		let user = await User.findOne({ email })

		if(!user){
			return res.status(400).json({errors: [{msg: "Invalid Credentials"}]})
		}
		const isMatch = await bcrypt.compare(password , user.password)

		if(!isMatch){
			return res.status(400).json({errors: [{msg: "Invalid Credentials"}]})
		}
		const payload = {
			user:{
				id: user.id
			}
		}

		jwt.sign(payload , config.get('jwtSecret'), {expiresIn: 3600000}, async (err, token) =>{
			try{
			res.json({
		  		token
		  	})

			}catch(err){
				throw err
			}
		})
		
	}catch{
		console.error(err.message);
		res.status(500).send('Server Error')
	}

})
module.exports = router