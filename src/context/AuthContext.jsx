
import { account } from "@/lib/appwrite";
import { createContext, useEffect, useState, useContext } from "react";
import { ID } from "appwrite";
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkUserStatus()
    }, [])

    const loginUser = async (userInfo) => {
        setLoading(true)
        try {
            let response = await account.createEmailPasswordSession(
                userInfo.email,
                userInfo.password
            )
            let accountDetails = await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }
    const logoutUser = async () => {
        await account.deleteSession('current');
        setUser(null)
    }

    const registerUser = async (userInfo) => {
        setLoading(true)
        try {
            let response = await account.create(
                ID.unique(),
                userInfo.email,
                userInfo.password1,
                userInfo.name
            )
            await account.createEmailPasswordSession(

                userInfo.email,
                userInfo.password1,

            )
            let accountDetails = await account.get()
            setUser(accountDetails)
            
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
     }

    const checkUserStatus = async () => {
        try {
            let accountDetails = await account.get();
            setUser(accountDetails)
        } catch (error) {

        }
        setLoading(false)
    }

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
