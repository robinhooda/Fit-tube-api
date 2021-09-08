const express = require('express');
let bodyparse = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(bodyparse.json())
const { errorHandler } = require("./middlewares/error-handler.middleware")
const { routeNotFound } = require("./middlewares/route-not-found.middleware")
const { verifyAuth } = require("./middlewares/verifyAuth.middleware")
app.use(cors());

const playlist=require("./routes/playlist.router.js")
const history=require("./routes/history.router.js")
const liked=require("./routes/liked.router.js")
const video=require("./routes/video.router.js")
const login=require("./routes/login.router.js");
const signup=require("./routes/signup.router.js");
const user=require("./routes/user.router.js");

const port = process.env.PORT || 4090;

require("dotenv").config();
//mongoose conn
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("mongoose connected")}).catch(error=>{console.log("mongoose connection problem",error)})


app.get("/", (req, res) => {
  res.send("Welcome to fit tube api!")
})
app.use('/playlist',verifyAuth, playlist);
app.use('/history',verifyAuth,history)
app.use("/liked",verifyAuth,liked);
app.use("/user",verifyAuth,user);
app.use("/video",video);
app.use('/login',login);
app.use('/signup',signup)
app.use(routeNotFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log('server started');
});