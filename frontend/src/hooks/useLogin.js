const { useState } = require("react");
const { useAuthContext } = require("./useAuthContext");

export const useLogin =  () =>{
    const {dispatch} = useAuthContext()
    const [Error, setError] = useState(null)
    const [isLoading, setisLoading] = useState (null)

    const Login = async(Email, Password) =>{
        setError(null)
        setisLoading(true)

        const response = await fetch('https://gym-buddy-eight.vercel.app/api/user/login',{
            method : "POST",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({Email,Password})
        })

        const json = await response.json()

        if(!response.ok){
          setisLoading(false)
          setError(json.error)
        }
        
        if(response.ok){
            //store user in browser local storage
           localStorage.setItem('user', JSON.stringify(json))
         
           //update global auth context
           
           dispatch({type: "LOGIN", payload:json })

           setisLoading(false)
        }
    }

    return{Login , isLoading , Error}
}