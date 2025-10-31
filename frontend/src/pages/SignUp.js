import { useSignup } from "../hooks/useSignup";
const { useState } = require("react");

const SignUp = () =>{
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const {signup, Error, isLoading} = useSignup()

    const handleSubmit = async(e)=>{
        e.preventDefault()

       await signup(Email,Password)
    }

    return(
        
        <form className="signup" onSubmit={handleSubmit} >
            <h4>Sign UP</h4>
        
        <label>Email:</label>
        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={Email} />
        
        <label>Password:</label>
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={Password} />

        <button disabled={isLoading}>Submit</button>
        {Error && <div className="error">{Error}</div>}

        </form>
    )

}

export default SignUp