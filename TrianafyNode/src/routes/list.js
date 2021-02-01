import { Router } from 'express';
import { ListController } from '../controllers/list';
import { param, body } from 'express-validator';
import { listRepository } from '../models/lists';

const router = Router();

router.post(
	'/',
	[
		body('name'),
		body('description'),
		body('userId'),
		body('songs'),
		body('id')
			.not()
			.exists()
			.withMessage(
				'No es necesario que proporcione un ID; este se asignará automáticamente'
			)
	],
	ListController.nuevaLista
);

router.get('/', ListController.todasLasListas);

router.get('/:id', ListController.listaPorId);

router.put('/:id', ListController.editarLista);

router.delete('/:id', ListController.eliminarLista);

export default router;
