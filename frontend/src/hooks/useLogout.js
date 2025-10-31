import { useWorkoutsContext } from "./useWorkoutsContext";

const { useAuthContext } = require("./useAuthContext");


export const useLogout = () =>{

    const {dispatch} = useAuthContext()
    const {dispatch : workoutdispatch} = useWorkoutsContext()

    const Logout = async () =>{
        localStorage.removeItem("user")

        dispatch({type:"LOGOUT"})
        workoutdispatch({type : "SET_WORKOUTS", payload: null})
    }

    return{Logout}
}