import 'dotenv/config';
import { User, userRepository } from '../models/users';
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt';

const AuthController = {
	register: async (req, res, next) => {
		let usuarioCreado = await userRepository.create({
			fullname: req.body.fullname,
			username: req.body.username,
			email: req.body.email,
			password: bcrypt.hashSync(
				req.body.password,
				parseInt(process.env.BCRYPT_ROUNDS)
			)
		});

		console.log(usuarioCreado);

		res.status(201).json({
			id: usuarioCreado.id,
			username: usuarioCreado.username,
			email: usuarioCreado.email
		});
	},

	login: async (req, res, next) => {
		const token = JwtService.sign(req.user);
		await res.status(201).json({
			user: req.user,
			token: token
		});
	}
};

export { AuthController };
