const mongoose = require('mongoose');

const { Schema } = mongoose;

const StatsScheme = new Schema({
	followers: Number,
	following: Number,
	posts: Number,
	date: {
		type: Date,
		default: Date.now,
	}
})

const Stats = mongoose.model("Stats", StatsScheme)

const PostsScheme = new Schema({
	postID: {
		type: String,
		unique: true,
	},
	thumbnail: String,
	caption: String,
	comments: Number,
	likes: Number,
	date: {
		type: Date,
		default: Date.now,
	}
})

const Posts = mongoose.model("Posts", PostsScheme)

const AccountsScheme = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		required: true,
		lowercase: true,
		type: String,
	},
	profilePicUrl: {
		required: false,
		type: String,
	},
	posts: [PostsScheme],
	shortTermStats: [StatsScheme],
	longTermStats: [StatsScheme]
}, {
	timestamps: true,
});

const Accounts = mongoose.model('Accounts', AccountsScheme);

module.exports = Accounts