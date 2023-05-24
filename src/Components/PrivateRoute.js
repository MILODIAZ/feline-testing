import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";

function PrivateRoute() {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {       
        console.log(isAuthenticated);        
        return <Navigate to={'/login'} />;
    }

    return (
        <div className="admin">
            <Outlet />
        </div>
    );
}

export default PrivateRoute;