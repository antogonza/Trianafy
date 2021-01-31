import { Router } from 'express';
import { UserController } from '../controllers/user';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';
import { emailExists } from '../models/users';

const router = Router();

router.post(
	'/',
	[
		body('fullname').exists(),
		body('username')
			.isLength({ min: 5 })
			.withMessage('La longitud mínima del nombre de usuario son 5 caracteres'),
		body('email')
			.isEmail()
			.withMessage('El campo email debe ser un email válido')
			.custom(async email => {
				if (await emailExists(email)) {
					throw new Error(
						'El email ya está registrado. Proporcione un valor diferente'
					);
				} else {
					return true;
				}
			}),
		body('id')
			.not()
			.exists()
			.withMessage(
				'No es necesario que proporcione un ID; este se asignará automáticamente'
			)
	],
	validar,
	UserController.nuevoUsuario
);

export default router;
