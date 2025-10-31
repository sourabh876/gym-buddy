import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'


//date-fns

import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutDetails  = ({workout}) => {

  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  const handleClick = async () =>{

    if(!user){
      return
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/workouts/${workout._id}`, {
      method : "DELETE",
      headers: {
            "Authorization" : `Bearer ${user.token}` 
           }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:"DELETE_WORKOUT", payload : json.workout})
      console.log("Deleting workout:", workout._id);
    }
  }

  return (
    <div className='workout-details'>
     <div className='title-header'>
      <h3>{workout.title}</h3>
      <ion-icon className='delete' onClick={handleClick} name="trash-outline" ></ion-icon>
     </div>
     <p><strong>Load (in Kgs:){workout.load}</strong></p>
     <p>Reps:{workout.reps}</p>
     <p>{formatDistanceToNow(new Date (workout.createdAt), {addSuffix:true})}</p>
     
    </div>
  )
}

export default WorkoutDetails
