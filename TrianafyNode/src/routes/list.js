import { Router } from 'express';
import { ListController } from '../controllers/list';
import { param, body } from 'express-validator';
import { listRepository } from '../models/lists';
import { token } from '../services/passport';
import { validar } from '../middlewares/validacion';

const router = Router();

router.post(
	'/',
	[
		body('name'),
		body('description'),
		body('userId'),
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

router.get('/:id/songs', ListController.obtenerCancionesDeLista);

router.post('/:idLista/songs/:idCancion', ListController.addCancionALista);

router.get('/:idLista/songs/:idCancion', ListController.obtenerCancionDeLista);

export default router;
