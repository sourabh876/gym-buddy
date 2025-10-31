const express = require ("express")

const router = express.Router()
const Workout = require("../Models/workoutmodel")
const requireAuth = require("../middleware/RequireAuth")

router.use(requireAuth)


const {getallworkouts, createworkout, getworkoutbyid, deleteworkout, updateworkout} = require("../controllers/workoutcontroller")

//get all workouts

// router.get("/", (req,res)=>{
//     res.status(200).json({
//         message: "Get all workouts"
//     })
// })

router.get("/", getallworkouts)


// get a single workout by its Id

// router.get("/:id", (req,res)=>{
//     res.status(200).json({
//         message: "get a single workout by its Id"
//     })
// })

router.get("/:id", getworkoutbyid)

// // create/add a new workout
// router.post("/", async (req,res)=>{
//    const {title,load,reps}= req.body

//    try{
  
//     const workout = await Workout.create({title, load, reps})

//     res.status(200).json({
//         workout
//     })

//    }catch(error){

//     res.status(404).json({
//         error: error.message
//     }) 

//    }
   
// })

router.post("/", createworkout)

//delete a workout
// router.delete("/:id", (req,res)=>{
//     res.status(200).json({
//         message: "workout deleted succesfully"
//     })
// })

router.delete("/:id", deleteworkout)


// update a workout by its id
// router.patch("/:id", (req,res)=>{
//     res.status(200).json({
//         message: "workout updated succesfully"
//     })
// })
router.patch("/:id", updateworkout)

module.exports = router