import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
	fullname: String,
	username: String,
	email: String,
	password: String
});

const User = mongoose.model('User', userSchema);

const emailExists = async email => {
	const result = await User.countDocuments({ email: email }).exec();
	return result > 0;
};

const usernameExists = async username => {
	const result = await User.countDocuments({ username: username }).exec;
	return result > 0;
};

const userRepository = {
	async create(newUser) {
		const theUser = new User({
			fullname: newUser.fullname,
			username: newUser.username,
			email: newUser.email,
			password: newUser.password
		});
		const result = await theUser.save();
		return result;
	}
};

export { User, userRepository, emailExists, usernameExists };
