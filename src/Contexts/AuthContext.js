import { createContext, useCallback, useState, useMemo, useContext } from "react";

const MY_AUTH_APP = "MY_AUTH_APP_1";
const MY_USER_NAME = "MY_USER_NAME_1";
const MY_USER_RUT = "MY_USER_RUT_1"

export const AuthContext = createContext();

function AuthContextProvider({children}){

  const [ userName, setUserName ] = useState(window.localStorage.getItem(MY_USER_NAME));
  const [ userRut, setUserRut ] = useState(window.localStorage.getItem(MY_USER_RUT));
  const [ isAuthenticated, setIsAuthenticated ] = useState(window.localStorage.getItem(MY_AUTH_APP) ?? false);
  const [ incorrectCredentials, setIncorrectCredentials ] = useState(false);

  const login = useCallback(function (userRut, password) {

    fetch("http://localhost/feline-testing/public/postQueries.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `query=1&usuario=${userRut}&pass=${password}`
    })
      .then(response => response.json())
      .then(data => {                        

        if(data[0][0]===true){
          window.localStorage.setItem(MY_AUTH_APP, true);
          window.localStorage.setItem(MY_USER_NAME, data[0][1]);
          window.localStorage.setItem(MY_USER_RUT, data[0][2]);
          setIsAuthenticated(true);          
          setUserName(data[0][1]);
          setUserRut(data[0][2]);
          setIncorrectCredentials(false);
        } else {
          setIncorrectCredentials(true);
        }

      })
      .catch(error => console.log(error)); 
    
  }, []);

  const logout = useCallback(function () {
    window.localStorage.removeItem(MY_AUTH_APP);
    window.localStorage.removeItem(MY_USER_NAME);
    window.localStorage.removeItem(MY_USER_RUT);
    setIsAuthenticated(false);    
    setUserName('');
    setUserRut('');
    setIncorrectCredentials(false);
  }, []);

  const value = useMemo(
    ()=>({
      login,
      logout,
      userName,
      userRut,
      incorrectCredentials,
      isAuthenticated
    }),
    [login, logout, userName, userRut, incorrectCredentials, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
  
}

export default AuthContextProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}