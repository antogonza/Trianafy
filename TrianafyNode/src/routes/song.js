import { Router } from 'express';
import { SongController } from '../controllers/song';
import { param, body } from 'express-validator';
import { songRepository } from '../models/songs';

const router = Router();

router.post(
	'/',
	[
		body('title'),
		body('artist'),
		body('album'),
		body('year').isInt(),
		body('id')
			.not()
			.exists()
			.withMessage(
				'No es necesario que proporcione un ID; este se asignará automáticamente'
			)
	],
	SongController.nuevaCancion
);

router.get('/', SongController.todasLasCanciones);

router.get('/:id', SongController.cancionPorId);

router.put('/:id', SongController.editarCancion);

router.delete('/:id', SongController.eliminarCancion);

export default router;
