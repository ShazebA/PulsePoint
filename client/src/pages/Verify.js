import { React, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const Verify = () => {
    const { isAuthenticated, user, loginWithRedirect} = useAuth0();

    
    useEffect(() => {
        const verifyConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: {email: user.email}
        };
        
        fetch('http://localhost:3002/verifyUser', verifyConfig).then(verifyRes => {
            console.log(verifyRes);
            if (verifyRes.body.user){
                return <Navigate to='dashboard'/>
            }
            // const createConfig = {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: {
            //         firstName: user.name.split(' ')[0],
            //         lastName: user.name.split(' ')[1],
            //         email: user.email
            //     }
            // }
            // fetch('http://localhost:3002/createUser', createConfig).then(createRes => {
            //     console.log(createRes.json());
            //     if (createRes.status === 200){
            //         return <Navigate to='dashboard' />
            //     }
            //     console.log(createRes.status);
            // })
        })
    }, []);
    
    if (!isAuthenticated){
        return <Navigate to={loginWithRedirect()}/>;
    }
}

export default Verify;