import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = () => {
    const { isLoading,  isAuthenticated, loginWithRedirect, error} = useAuth0();
    // console.log(isAuthenticated);

    if (isLoading){
        return <h1>Loading Authentication</h1>
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
        return <Outlet />;
    } else {
        return <Navigate to={loginWithRedirect()} />;
    }
};

export default PrivateRoute;