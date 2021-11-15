//Require Dependecies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const app = express();

//Set up Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGDB_URI || "mongodb://localhost/workout", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 });

//Require the routes
app.use(require("./routes/htmlRoutes.js"));
app.use(require("./routes/api.js"))


app.listen(PORT, () => { 
    console.log(`App listening on port ${PORT}!`);
});