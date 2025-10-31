
const { createContext, useReducer, useEffect} = require("react");


export const AuthContext = createContext()

export const Authreducer = (state, action)=>{
 
    switch (action.type){
        case  "LOGIN" : {
            return {user: action.payload}
        }
        case "LOGOUT" : {
            return {user: null}
        }
        default:{
            return state
        }

    }
}

export const AuthContextProvider = ({children})=>{

    const [state,dispatch]= useReducer(Authreducer,{
        user: null
    })

    useEffect(()=>{

        const user = JSON.parse(localStorage.getItem("user"))

        if(user){
            dispatch({type:"LOGIN", payload:user})
        }

    },[ ])

    console.log("AuthContext :", state)
    return(

        <AuthContext.Provider value={{...state , dispatch}} >
            {children}
        </AuthContext.Provider>
    )
}