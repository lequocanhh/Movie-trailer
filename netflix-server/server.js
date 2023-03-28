const express = require("express")
const cors = require("cors")
const mongooes = require("mongoose")
const userRoutes = require('./routes/UserRoutes')

const app = express()

app.use(cors())
app.use(express.json())

mongooes.connect("mongodb+srv://quocanh:quocanh123@netflix.vi6bcuq.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB CONNECTED");
})

app.use("/api/user", userRoutes)

app.listen(5000, console.log("server started"))

