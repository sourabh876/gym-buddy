const { useContext } = require("react");
const { AuthContext } = require("../context/AuthContext");


export const useAuthContext = ()=>{
    const context = useContext(AuthContext)

    if(!context){
        throw Error("useAuthcontext must be inside in AuthContextProvider")
    }

    return context
}

