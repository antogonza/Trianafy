import 'dotenv/config';
import { User, userRepository } from '../models/users';
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt';

const AuthController = {
	register: (req, res, next) => {
		let usuarioCreado = userRepository.create(
			new User(
				req.body.fullname,
				req.body.username,
				req.body.email,
				bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))
			)
		);

		res.status(201).json({
			id: usuarioCreado.id,
			username: usuarioCreado.username,
			email: usuarioCreado.email
		});
	},
	login: (req, res, next) => {
		const token = JwtService.sign(req.user);
		res.status(201).json({
			user: req.user,
			token: token
		});
	}
};

export { AuthController };
