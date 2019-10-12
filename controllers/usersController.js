const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

exports.createUser = async (req, res) => {
	const {name, email, password} = req.body;
	try {
		let user = await User.findOne({email});
		if (user) return res.status(400).json({msg: 'User already exists'});

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		user = new User({name, email, password: hashedPassword});

		await user.save();

		const payload = {
			user: {
				id: user.id
			}
		};

		jwt.sign(
			payload,
			config.get('jwtSecret'),
			{expiresIn: 3600},
			(err, token) => {
				if (err) throw err;
				return res.json({token});
			}
		);
	} catch (err) {
		console.error(err);
		return res.status(500).json({msg: 'Something went wrong'});
	}
};
