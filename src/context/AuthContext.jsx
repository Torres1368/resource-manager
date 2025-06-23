import { account, teams, } from "@/lib/appwrite";
import { createContext, useEffect, useState, useContext } from "react";
import { ID } from "appwrite";
import { Flex, ProgressCircle } from "@chakra-ui/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [userRoles, setUserRoles] = useState({
        isRRHH: false,
        isAdmin: false,
        isAdministrativa: false,
    });

    useEffect(() => {
        checkUserStatus();
    }, []);

    const loginUser = async (userInfo) => {
        setLoading(true);
        try {
            await account.createEmailPasswordSession(userInfo.email, userInfo.password);
            const accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const logoutUser = async () => {
        await account.deleteSession('current');
        setUser(null);
    };

    const loginWithOAuth = async (provider) => {
        try {
            const successURL = import.meta.env.VITE_APPWRITE_OAUTH_SUCCESS;
            const failureURL = import.meta.env.VITE_APPWRITE_OAUTH_FAILURE;
            account.createOAuth2Session(provider, successURL, failureURL);
        } catch (error) {
            console.error('OAuth login error', error);
        }
    };

    const registerUser = async (userInfo) => {
        setLoading(true);
        try {
            await account.create(ID.unique(), userInfo.email, userInfo.password1, userInfo.name);
            await account.createEmailPasswordSession(userInfo.email, userInfo.password1);
            const accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };


    const isMember = async (teamId, userId) => {
        try {
            const res = await teams.listMemberships(teamId);
            return res.memberships.some(m => m.userId === userId);
        } catch {
            return false;
        }
    };

    const rolesToCheck = {
        isRRHH: import.meta.env.VITE_TEAM_RRHH_ID,
        //isAdmin: import.meta.env.VITE_TEAM_ADMIN_ID,
        //isAdministrativa: import.meta.env.VITE_TEAM_ADMINISTRATIVA_ID,
        //para  ir agregando mas roles aqui
    };

    const checkUserStatus = async () => {
        try {
            const accountDetails = await account.get();
            setUser(accountDetails);
            const userId = accountDetails.$id;

            
            const roleChecks = await Promise.all(
                Object.entries(rolesToCheck).map(async ([roleKey, teamId]) => {
                    const member = await isMember(teamId, userId);
                    return [roleKey, member];
                })
            );

            setUserRoles(Object.fromEntries(roleChecks));
        } catch (error) {
            console.error("Error getting user:", error);
            setUserRoles({});
        } finally {
            setLoading(false);
        }
    };

    const contextData = {
        user,
        userRoles,
        loginUser,
        logoutUser,
        registerUser,
        checkUserStatus,
        loginWithOAuth,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (
                <Flex height="100vh" justify="center" align="center">
                    <ProgressCircle.Root value={75} size="xl" colorPalette="red">
                        <ProgressCircle.Circle>
                            <ProgressCircle.Track />
                            <ProgressCircle.Range strokeLinecap="round" />
                        </ProgressCircle.Circle>
                    </ProgressCircle.Root>
                </Flex>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
