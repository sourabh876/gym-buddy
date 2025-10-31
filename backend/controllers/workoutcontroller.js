const Workout = require("../Models/workoutmodel")
const mongoose = require("mongoose")

//get all workouts

exports.getallworkouts = async(req,res)=>{

    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt : -1})

    if(workouts.length === 0){
      return  res.status(404).json({
            Message: "no wokout found yet",
            
        })
    }

    res.status(200).json({
        data : workouts
    })

}

//create a workout

exports.createworkout = async(req,res) =>{
    const {title,load,reps}= req.body

    let Emptyfeilds = [];

  
if (!title) {
  Emptyfeilds.push("title");
}
if (!load) {
  Emptyfeilds.push("load");
}
if (!reps) {
  Emptyfeilds.push("reps");
}
    
    if(Emptyfeilds.length > 0){
        res.status(400).json({error: "please fill out all the feilds.", Emptyfeilds})
    }
       try{
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id})
    
        res.status(200).json({
            workout
        })
    
       }catch(error){
    
        res.status(404).json({
            error: error.message
        }) 
    
       }
       
}

//get a single workout by id

exports.getworkoutbyid = async(req,res)=>{
      const {id} = req.params;

      
      if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({message: "no such workout found"})
        }
       
       
     const workout = await Workout.findById(id)
    
     if(!workout){
     return   res.status(404).json({
            success: false,
            message: `no workout is found with id:${id}`
        })
    }

    res.status(200).json({
        success: true,
        data : workout
    })
}

//delete a workout by id

exports.deleteworkout = async(req, res) => {
    
    const {id} = req.params

    

    if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({message: "no such workout found"})
        }
    
    const workout = await Workout.findByIdAndDelete(id)
    
    if(!workout){
        return res.status(404).json({
            success : false,
            message : `no workout found with id:${id}`
        })
    }
    res.status(200).json({
        workout
    })

}


// update workout by id

exports.updateworkout = async (req,res) => {

    const {id} = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({message: "no such workout found"})
        }

    const workout = await Workout.findByIdAndUpdate(
        {_id : id},
        {...req.body},
        {new : true}
    )

     if(!workout){
        return res.status(404).json({
            success : false,
            message : `no workout found with id:${id}`
        })
    }

    res.status(200).json({
        workout
    })

}
