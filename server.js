//Require Dependecies
const express = require("express");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./models");

//Set up Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Require the routes
require("./routes/html.js")(app, path);
app.use(express.static("public"));

mongoose.connect(process.env.MONGDB_URI || "mongodb://localhost/workout", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 });

//db Create
db.Workout.create({ name: "Front Squat" })
    .then(dbWorkout => {
        console.log(dbWorkout);
    })
    .catch(({ message }) => {
        console.log(message);
    });

    //GET Workout
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .populate("exercises")
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    //PUT Workout
    app.put("/api/workouts/:id", (req, res) => {
        console.log(req.body);
        db.Exercise.create(req.body)
            .then((data) => db.Workout.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $push: {
                        exercises: data._id
                    },
                    $inc: {
                        totalDuration: data.duration
                    }
                },
                { new: true })
            )
            .then(dbWorkout => {
                res.json(dbWorkout);
            }).catch(err => {
                res.json(err);
            });
    });

    //POST Route for Workout
    app.post("/api/workouts", (req, res) => {
        db.Workout.create({day: Date.now()})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    //GET for Workout Range
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .populate("exercises")
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

app.listen(PORT, () => { 
    console.log(`App running on port ${PORT}!`);
});