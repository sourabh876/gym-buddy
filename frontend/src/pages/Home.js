import React, { useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'



const Home = () => {
  
  // const [workouts, setworkouts] = useState([])
  const {workouts,dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  useEffect(()=>{

    const fetchworkouts =async () =>{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/workouts`,{
           headers: {
            "Authorization" : `Bearer ${user.token}` 
           }
      })
      const json = await response.json()
      console.log(json)

      if(response.ok){
        // setworkouts(json.data)
        dispatch({type:"SET_WORKOUTS", payload: json.data})
      }
    }

    if(user){
      fetchworkouts()
    }

  },[dispatch, user])

  return (
    <div className='home'>
      <div className='workouts'> 
          {
            workouts && workouts.map((workout)=>(
              <WorkoutDetails key={workout._id} workout={workout}   />
            ))
          }
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home
