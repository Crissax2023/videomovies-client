import { useState, useEffect,createContext } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();

const AuthProvider = (props)=> {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token)=>{
    localStorage.setItem('authToken',token)
  }

  const authenticateUser = async () => {

    const storedToken = localStorage.getItem('authToken');
    if(storedToken) {
        try {

            const response = await authService.verify();
            const userInfo = response.data;
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(userInfo); 
            } catch (error) {
                setIsLoggedIn(false);
                setIsLoading(false);
                setUser(null);  
            }

    } else {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);  
    }
}

const removeToken = () => {
    localStorage.removeItem('authToken')
}

const logout = () => {
    removeToken()
    setIsLoggedIn(false);
    setIsLoading(false);
    setUser(null);  
}

useEffect(() => {
    authenticateUser()
}, [])


  return (
    <AuthContext.Provider value={{isLoggedIn,isLoading,user,storeToken,authenticateUser,logout}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
