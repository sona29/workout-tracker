const router = require("express").Router();

const db = require("../models");

router.get("/api/workouts", (req, res) => {
  //Aggregation operations process data records and return computed results
  db.Workout.aggregate([
    {
      $addFields: { totalDuration: { $sum: "$exercises.duration" } },
    },
  ])

    .sort({ date: -1 })
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: { totalDuration: { $sum: "$exercises.duration" } },
    },
  ])
    .sort({ date: -1 })
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//for creating new workout
router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//for adding exercise in existing workout
router.put("/api/workouts/:id", function ({ body, params }, res) {
  db.Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
