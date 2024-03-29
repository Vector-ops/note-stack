const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new Schema({
	title: {
		type: String,
		required: [true, "must provide title"],
		trim: true,
	},
	body: {
		type: String,
		trim: true,
	},
	author_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model("Note", notesSchema);
