const mongooes = require("mongoose")
const { model } = require("mongoose")

const UserSchema = new mongooes.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    likedMovies: Array,
})

module.exports = mongooes.model("user", UserSchema)