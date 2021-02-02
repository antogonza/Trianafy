import mongoose from 'mongoose';
import { Song } from './songs';
const { Schema } = mongoose;

const listSchema = new Schema({
	name: String,
	description: String,
	userId: {
		type: mongoose.ObjectId,
		ref: 'User'
	},
	songs: [
		{
			type: mongoose.ObjectId,
			ref: 'Song'
		}
	],
	versionKey: false
});

const List = mongoose.model('List', listSchema);

const listRepository = {
	async findAll(userId) {
		const result = await List.find({ userId: userId }).populate('songs').exec();
		return result;
	},
	async findById(id, userId) {
		const result = await List.findById(id)
			.populate('user_id', '_id')
			.populate('songs')
			.exec();
		return result != null ? result : undefined;
	},
	async create(newList) {
		const theList = new List({
			name: newList.name,
			description: newList.description,
			userId: newList.userId,
			songs: []
		});
		const result = await theList.save();
		return result;
	},
	async updateById(id, modifiedList) {
		const listSaved = await List.findById(id);

		if (listSaved != null) {
			return await Object.assign(listSaved, modifiedList).save();
		} else return undefined;
	},
	async delete(id) {
		await List.findByIdAndRemove(id).exec();
	},

	async getSongsFromList(id) {
		const result = await List.findOne({ id: id }).populate('songs').exec();
		if (result != null) {
			return result;
		} else return undefined;
	},

	async addSongsToList(idList, idSong) {
		const list = await List.findOne({ idList: idList })
			.populate('songs')
			.exec();
		const song = await Song.findById(idSong);

		if (list != null && song != null) {
			list.songs.push(song);
			await list.save();
			return list;
		}
	},

	async getSongFromList(idList, idSong) {
		const list = await List.findOne({ id: idList })
			.populate({
				path: 'songs',
				match: { id: idSong }
			})
			.exec();
		if (list != null && list.songs.length > 0) {
			return list.songs[0];
		}
	}
};

export { List, listRepository };
