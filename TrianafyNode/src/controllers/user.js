import { User, userRepository } from '../models/users';

import { validationResult } from 'express-validator';

const UserController = {
	nuevoUsuario: async (req, res) => {
		console.log(req.body);
		let usuarioCreado = await userRepository.create({
			fullname: req.body.fullname,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		});
		console.log('ds');
		res.status(201).json(usuarioCreado);
	}
};

export { UserController };
