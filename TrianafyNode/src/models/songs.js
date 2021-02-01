import mongoose from 'mongoose';
const { Schema } = mongoose;

const songSchema = new Schema({
	title: String,
	artist: String,
	album: String,
	year: Number
});

const Song = mongoose.model('Song', songSchema);

const songRepository = {
	async findAll() {
		const result = await Song.find({}).exec();
		return result;
	},
	async findById(id) {
		const result = await Song.findById(id).exec();
		return result != null ? result : undefined;
	},
	async create(newSong) {
		const theSong = new Song({
			title: newSong.title,
			artist: newSong.artist,
			album: newSong.album,
			year: newSong.year
		});
		const result = await theSong.save();
		return result;
	},
	async updateById(id, modifiedSong) {
		const songSaved = await Song.findById(id);

		if (songSaved != null) {
			return await Object.assign(songSaved, modifiedSong).save();
		} else return undefined;
	},
	async delete(id) {
		await Song.findByIdAndRemove(id).exec();
	}
};

export { Song, songRepository };
