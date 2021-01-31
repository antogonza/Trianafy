import { Router } from 'express';
import { SongController } from '../controllers/song';
import { param, body } from 'express-validator';
import { songRepository } from '../models/songs';

const router = Router();

router.post('/songs', [
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
]);

router.get('/songs', SongController.todasLasCanciones);

router.get('/songs/:id', SongController.cancionPorId);

router.put('/song', SongController.editarCancion);

router.delete('/songs/:id', SongController.eliminarCancion);

export default router;
