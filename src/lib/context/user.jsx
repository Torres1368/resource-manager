import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";
import { useNavigate } from "react-router";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function login(email, password) {
    try{
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
    navigate("/home");
     } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
  }
}

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    navigate("/login")
  }

  async function register(email, password) {
    
  try{
    await account.create(ID.unique(), email, password);
    await login(email, password);
  } catch(error){
    console.error("error al registrar: ", error.message)
  }
}

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
};
