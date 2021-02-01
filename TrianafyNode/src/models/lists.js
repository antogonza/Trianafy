import mongoose from 'mongoose';
const { Schema } = mongoose;

const listSchema = new Schema({
	name: String,
	description: String,
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	songs: {
		type: Schema.Types.ObjectId,
		ref: 'Song'
	}
});

const List = mongoose.model('List', songSchema);

const listRepository = {
	async findAll() {
		const result = await List.find({}).exec();
		return result;
	},
	async findById(id) {
		const result = await List.findById(id).exec();
		return result != null ? result : undefined;
	},
	async create(newList) {
		const theList = new List({
			name: newList.name,
			description: newList.description,
			userId: newList.userId,
			songs: newList.songs
		});
		const result = await theList.save();
		return result; // Posiblemente aquí nos interese implementar un DTO
	},
	async updateById(id, modifiedList) {
		const listSaved = await List.findById(id);

		if (listSaved != null) {
			return await Object.assign(listSaved, modifiedList).save();
		} else return undefined;
	},
	async delete(id) {
		await List.findByIdAndRemove(id).exec();
	}
};

export { List, listRepository };
