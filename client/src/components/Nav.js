import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Nav = () => {
    const {loginWithRedirect} = useAuth0();
    return (
        <nav>
            <h1>PulsePoint</h1>
            <button onClick={() => loginWithRedirect()}>Log In</button>
        </nav>
    );
}

export default Nav;