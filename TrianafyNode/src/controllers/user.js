import { User, userRepository } from '../models/users';

import { validationResult } from 'express-validator';

const UserController = {
	nuevoUsuario: (req, res) => {
		let usuarioCreado = userRepository.create(
			new User(req.body.username, req.body.email)
		);
		res.status(201).json(usuarioCreado);
	}
};

export { UserController };
