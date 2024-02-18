import {React, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";

import LandingNav from './LandingNav';
import ClinicDashNav from './ClinicDashNav';
import PatientDashNav from './PatientDashNav';

const Nav = () => {
    const { user, isAuthenticated} = useAuth0();
    const [getUser, setUser] = useState({});
  
    useEffect(() => {
      const handleSetup = () => {
        try {
          const queryParameters = new URLSearchParams({
            email: user.email
          })
          fetch(`http://localhost:3002/verifyUser?${queryParameters}`).then(response => {
            if (!response.ok){
              throw new Error("Failed to fetch user");
            }
            // console.log(response.body);
            return response.json();
          }).then(data => {

            // console.log("User Info: " + JSON.stringify(data));
            if (data){
              setUser(data);
            }
          })
        } catch(err) {
          console.log(err);
        }
      }
      if (isAuthenticated){
        handleSetup();
      }
    }, [isAuthenticated, user]);
    return (
        <>
            {isAuthenticated ? (getUser && getUser.isClinic ? <ClinicDashNav user={getUser}/> : <PatientDashNav user={getUser}/>) : <LandingNav />}
        </>
    );
}

export default Nav;