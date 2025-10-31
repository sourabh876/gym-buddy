import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()

export const WorkoutsReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUT":
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case "DELETE_WORKOUT":
            console.log("Reducer received DELETE:", action.payload._id)
            return {
                 
               workouts: state.workouts.filter( (each) => each._id !== action.payload._id)
               
                }
        default:
            return state
    }
}


export const WorkoutContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer( WorkoutsReducer, {
        workouts: []
    })

    return (
        <WorkoutContext.Provider  value={{...state,dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}