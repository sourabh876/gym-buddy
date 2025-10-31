import { useLogin } from "../hooks/useLogin";

const { useState } = require("react");

const Login = () =>{
     const [Email, setEmail] = useState('')
        const [Password, setPassword] = useState('')
        const {Login, Error, isLoading} = useLogin()
    
        const handleSubmit = async(e)=>{
            e.preventDefault()
    
           await Login(Email,Password)
        }

    return(
        
        <form className="login" onSubmit={handleSubmit} >
            <h4>Login</h4>
        
        <label>Email:</label>
        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={Email} />
        
        <label>Password:</label>
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={Password} />

        <button disabled={isLoading}>Submit</button>
        {Error && <div className="error">{Error}</div>}

        </form>
    )

}

export default Login