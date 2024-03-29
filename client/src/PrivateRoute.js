import {React, Navigate} from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = () => {
    const { isLoading,  isAuthenticated, loginWithRedirect, error} = useAuth0();
    // console.log(isAuthenticated);

    if (isLoading){
        return <div class="route-spinner-container"><span class="route-spinner"></span></div>;
    }

    if (error){
        return (
            <>
                <h1>{error.stack}</h1>
                {/* <p>User: {user.email}</p>
                <p>User sub: {user.sub}</p> */}
            </>
        );
    }


    if (isAuthenticated) {
        return <Outlet/>;
    } else {
        console.log("Is Authenticated: " + isAuthenticated);
        return <Navigate to={loginWithRedirect()} />;
    }
};

export default PrivateRoute;