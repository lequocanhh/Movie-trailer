const { json } = require('express')
const User = require('../models/UserModel')

module.exports.addToLikedMovies = async(req, res) => {
    try {
        const { email, data } = req.body
        const user = await User.findOne({email})
        if(user){
            const { likedMovies } = user
            const movieLiked = likedMovies.find(({id}) => (id === data.id))
            if(!movieLiked){
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [ ...user.likedMovies, data]
                    },
                    {
                        new: true
                    }
                )
            }else{
                return res.json({msg: "Add movie to liked list successfully."})
            }
        }else{
            await User.create({email, likedMovies: [data]})
        }
    } catch (error) {
        return res.json({msg: "Error adding movie"})
    }
}

module.exports.getLikedMovies = async(req, res) => {
    try {
        const {email} = req.params
        const user = await User.findOne({email})
        if(user){
            res.json({
                msg: "success",
                movies: user.likedMovies 
            })
        }else{
            res.json({
                msg: "User with given email not found"
            })
        }
    } catch (error) {
        
    }
}

module.exports.unlikedMovie = async(req, res) => {
    try {
        const { email, movieId } = req.body
        const user = await User.findOne({email})
        if(user){
            const movies = user.likedMovies
            const movieIndex = movies.findIndex(({id}) => (id === movieId))
           if(!movieIndex){
            res.status(400).send({msg: "Movie not found"})
        }
        movies.splice(movieIndex, 1)
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: movies
                    },
                    {
                        new: true
                    }
                )
         return res.json({msg: "Movie deleted", movies}) 
                }     else return res.json({ msg: "User with given email not found." }); 
    }catch (error) {
        return res.json({msg: "Error unlike movie"})
    }

}