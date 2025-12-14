import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'




const WorkoutForm = () => {

  const [Emptyfeilds, setEmptyfeilds] = useState([])
  const { user } = useAuthContext()
  const { dispatch } = useWorkoutsContext()
  const [title, settitle] = useState('')
  const [load, setload] = useState('')
  const [reps, setreps] = useState('')
  const [error, seterror] = useState(null)



  const handlesubmit = async (e) => {

    e.preventDefault();

    if (!user) {
      return seterror("User must be logged in!")
    }



    const workout = { title, load, reps }

    const response = await fetch(`/api/workouts`, {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (!response.ok) {
      seterror(json.error)
      setEmptyfeilds(json.Emptyfeilds)
    }
    else {
      seterror(null);
      setEmptyfeilds([])
      settitle('');
      setload('');
      setreps('');
      dispatch({ type: "CREATE_WORKOUT", payload: json.workout })
      console.log("Workout created:", json.workout);

    }

  }



  return (
    <div>
      <form className='workout-form' onSubmit={handlesubmit}>

        <h3>Create a new workout</h3>

        <label>Excercise Title:</label>
        <input type='text' value={title} onChange={(e) => settitle(e.target.value)}
          className={Emptyfeilds.includes("title") ? "error" : ""} />

        <label>Load (in Kg's):</label>
        <input type='number' value={load} onChange={(e) => setload(e.target.value)}
          className={Emptyfeilds.includes("load") ? "error" : ""} />

        <label>Reps:</label>
        <input type='number' value={reps} onChange={(e) => setreps(e.target.value)}
          className={Emptyfeilds.includes("reps") ? "error" : ""} />


        <button>Add Workout</button>
        {error && <div className="error">{error}</div>
        }



      </form>
    </div>
  )
}

export default WorkoutForm
