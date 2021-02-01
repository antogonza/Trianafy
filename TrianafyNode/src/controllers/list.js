import { List, listRepository } from '../models/lists.js';

import { body, validationResult } from 'express-validator';

const ListController = {
	todasLasListas: async (req, res) => {
		const data = await listRepository.findAll();
		if (Array.isArray(data) && data.length > 0) res.json(data);
		else res.sendStatus(400);
	},

	listaPorId: async (req, res) => {
		let list = await listRepository.findById(req.params.id);
		if (list != undefined) {
			res.json(list);
		} else {
			res.sendStatus(404);
		}
	},

	nuevaLista: async (req, res) => {
		let listaCreada = await listRepository.create({
			name: req.body.name,
			description: req.body.description,
			userId: req.body.userId,
			songs: req.body.songs
		});
		res.status(201).json(listaCreada);
	},

	editarLista: async (req, res) => {
		let listaModificada = await listRepository.updateById(req.params.id, {
			name: req.body.name,
			description: req.body.description,
			userId: req.body.userId,
			songs: req.body.songs
		});
		if (listaModificada == undefined) res.sendStatus(404);
		else res.status(200).json(listaModificada);
	},

	eliminarLista: async (req, res) => {
		let lista = await listRepository.findById(req.params.id);
		if (lista != undefined) {
			listRepository.delete(req.params.id);
			res.sendStatus(204);
		} else {
			res.sendStatus(404);
		}
	},

	obtenerCancionesDeLista: async (req, res) => {
		let canciones = await listRepository.getSongFromList(req.params.id);
		if (canciones != null) {
			res.json(canciones);
		} else res.status(404);
	},

	addCancionALista: async (req, res) => {
		let cancion = await listRepository.addSongsToList(
			req.params.id,
			req.params.idCancion
		);
		if (cancion != null) {
			res.json(cancion);
		} else res.status(404);
	},

	obtenerCancionDeLista: async (req, res) => {
		let cancion = await listRepository.getSongFromList(
			req.params.id,
			req.params.idCancion
		);
		if (cancion != null) {
			res.json(cancion);
		} else res.status(404);
	}
};

export { ListController };
