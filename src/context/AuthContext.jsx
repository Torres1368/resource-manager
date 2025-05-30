
import { account } from "@/lib/appwrite";
import { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);

    useEffect(() => {
        setLoading(false)
    }, [])

    const loginUser = async (userInfo) => { 
        setLoading(true)
        try{
            let response = await account.createEmailPasswordSession(
                userInfo.email,
                userInfo.password
            )
            console.log('SESION:', response)
        }catch(error){
            console.error.log("el error: "+error)
        }
        setLoading(false)
    }
    const logoutUser = () => { }
    const registerUser = (userInfo) => { }
    const checkUserStatus = () => { }
    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
        checkUserStatus
    }
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>loading..</p> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext;
