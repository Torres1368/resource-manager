
import { account } from "@/lib/appwrite";
import { createContext, useEffect, useState, useContext } from "react";
import { ID } from "appwrite";
import { Flex, ProgressCircle } from "@chakra-ui/react"
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
            {loading ?

                <Flex height="100vh" justify="center"  align="center" >
                    <ProgressCircle.Root value={75} size="xl" colorPalette="red">
                        <ProgressCircle.Circle>
                            <ProgressCircle.Track />
                            <ProgressCircle.Range strokeLinecap="round" />
                        </ProgressCircle.Circle>
                    </ProgressCircle.Root>
                </Flex>

                : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext;
