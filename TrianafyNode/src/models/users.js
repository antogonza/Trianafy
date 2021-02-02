import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { json } from 'express';
const { Schema } = mongoose;

const userSchema = new Schema({
	fullname: String,
	username: String,
	email: String,
	password: String,
	versionKey: false
});

const User = mongoose.model('User', userSchema);

const emailExists = async email => {
	const result = await User.countDocuments({ email: email }).exec();
	return result > 0;
};

const usernameExists = async username => {
	const result = await User.countDocuments({ username: username }).exec();
	return result > 0;
};

const userRepository = {
	async create(newUser) {
		let user = JSON.stringify(newUser);
		console.log('usuario: ' + user);
		const theUser = new User({
			fullname: newUser.fullname,
			username: newUser.username,
			email: newUser.email,
			password: newUser.password
		});
		const result = await theUser.save();
		console.log(result);
		return result;
	},

	async findByUsername(username) {
		let user = await User.findOne({ username: username }).exec();
		if (user != null) {
			return user;
		} else return undefined;
	},

	async findById(id) {
		const result = await Usuario.findById(id).exec();
		if (result != null) {
			return result;
		} else return undefined;
	}
};

export { User, userRepository, emailExists, usernameExists };
