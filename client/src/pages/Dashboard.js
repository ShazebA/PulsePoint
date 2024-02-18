import {React, Navigate, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PatientDashboard from "./PatientDashboard";
import ClinicDashboard from "./ClinicDashboard";

const Dashboard = () => {
    const { user, isAuthenticated, loginWithRedirect} = useAuth0();
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

            console.log("User Info: " + data);
            // setUser(data);
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
    {isAuthenticated ? (getUser && getUser.isClinic ? <ClinicDashboard user={getUser} /> : <PatientDashboard user={getUser} /> ) : <Navigate to={loginWithRedirect()} />}
    </>
  );
};

export default Dashboard;