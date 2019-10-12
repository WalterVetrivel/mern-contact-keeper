const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.getCurrentUser = (req, res) => {
	res.send('Get current user');
};

exports.login = async (req, res) => {
	const {email, password} = req.body;
	try {
		let user = await User.findOne({email});
		if (!user) return res.status(400).json({msg: 'Invalid credentials'});
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

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
