const router = require("express").Router();
const Workout = require("../models/workouts");
const { route } = require("./htmlRoutes");


    //GET Workout===========
    router.get("/api/workouts", (req, res) => {
        Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercise.duration'
                    },
                },
            },
        ])
            .then((workout) => {
                console.log("WORRRRK", workout);
                res.json(workout)
            })
            .catch((err) => {
                res.json(err)
            })
    });

    //POST Route for Workout=========
    router.post("/api/workouts", (req, res) => {
        Workout.create({})
            .then((workout) => {res.json(workout)})
            .catch(err => {
                res.json(err);
            })
    });

    //PUT Workout==============
    router.put("/api/workouts/:id", (req, res) => {
        console.log("THESE ARE PARAMS:", req.params)
        Workout.findOneAndUpdate(
            req.params.id,
            { $push: { exercises: req.body } },
            { new: true, runValidators: true }
        )
            .then((workout) => {
                res.json(workout)
            })
            .catch((err) => {
                res.json(err)
            })
    });

    //GET for Workout Range==========================
    router.get(`/api/workouts/range`, (req, res) => {
        Workout.aggregate([
            {
                $addFields: {
                    totalDuration:
                        { $sum: '$exercise.duration' },
                    totalWeight:
                        { $sum: '$exercises.weight' }
                }
            }
        ])
            .limit(10)        
            .then((workout) => { 
                res.json(workout)
            })
            .catch(err => {
                res.json(err);
            });
    });

module.exports = router;

