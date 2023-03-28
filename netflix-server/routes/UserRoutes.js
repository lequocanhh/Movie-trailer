const express = require("express")
const router = express.Router()
const { addToLikedMovies, getLikedMovies, unlikedMovie } = require("../controllers/UserController")

router.post("/add", addToLikedMovies)

router.get("/liked/:email", getLikedMovies)

router.put("/delete", unlikedMovie)

module.exports = router