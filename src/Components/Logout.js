import { useEffect } from "react";
import { useAuthContext } from "../Contexts/AuthContext";

function Logout(){

  const { logout } = useAuthContext();

  useEffect( () => logout() );

  return null;
  
}
  
export default Logout;