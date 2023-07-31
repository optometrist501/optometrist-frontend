import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.init";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const [user] = useAuthState(auth);
    const location = useLocation();
    console.log(user);


    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }


    return children
};

export default RequireAuth;