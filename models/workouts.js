//Require dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date
    },

    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "exercise"
        }
    ]
});

const WorkoutSchema = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;