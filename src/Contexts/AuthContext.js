import { createContext, useCallback, useState, useMemo, useContext } from "react";

const MY_AUTH_APP = "MY_AUTH_APP_1";
const MY_USER_NAME = "MY_USER_NAME_1";

export const AuthContext = createContext();

function AuthContextProvider({children}){

  const [ userName, setUserName ] = useState(window.localStorage.getItem(MY_USER_NAME));
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
          setIsAuthenticated(true);          
          setUserName(data[0][1]);
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
    setIsAuthenticated(false);    
    setUserName('');
    setIncorrectCredentials(false);
  }, []);

  const value = useMemo(
    ()=>({
      login,
      logout,
      userName,
      incorrectCredentials,
      isAuthenticated
    }),
    [login, logout, userName, incorrectCredentials, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
  
}

export default AuthContextProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}