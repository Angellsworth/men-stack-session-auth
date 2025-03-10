//Depedencies
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const dotenv = require('dotenv')

//Initialize Express App
const app = express()

//Configure Settings
dotenv.config()
const port = process.env.PORT || "3000"
// const port = process.env PORT ? process.env.PORT : "3000"

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
//Mount Middleware
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan('dev'))


//Mount Routes
// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
//Tell the app to Listen
app.listen(port, () => {
    console.log(`Angela, Your Express app is Authenticating on port ${port}!!`)
})