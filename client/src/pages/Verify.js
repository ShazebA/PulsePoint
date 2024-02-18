import { React, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const Verify = () => {
    const { isAuthenticated, user, loginWithRedirect} = useAuth0();

    
    useEffect(() => {
        const queryParameters = new URLSearchParams({
            email: user.email
        });
        try {

            fetch(`http://localhost:3002/verifyUser?${queryParameters}`).then(res => {
                if (!res.ok){
                    throw new Error("Failed to fetch user");
                }

                return res.user
            }).then(userExists => {
                if (userExists){
                    console.log("HEEERRREEEE");
                    return <Navigate to="/dashboard"/>;
                }
                const config = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: user.name.split(' ')[0],
                        lastName: user.name.split(' ')[1],
                        email: user.email
                    })
                }
                fetch('http://localhost:3002/createUser', config).then(res => {
                    if (res.ok){
                        console.log(res.status);

                        return <Navigate to="/dashboard"/>
                    } else {
                        console.log(res.status);
                        return <Navigate to={loginWithRedirect()}/>
                    }
                })
            })
        } catch (err){
            console.log(err);
            return <Navigate to="/verify"/>;
        }
    }, []);
    
    if (isAuthenticated){
        return <Navigate to="/dashboard"/>;
    } else {
        return <Navigate to="/"/>;
    }
}

export default Verify;