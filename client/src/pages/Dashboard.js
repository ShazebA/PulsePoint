import {React, Navigate, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PatientDashboard from "./PatientDashboard";
import ClinicDashboard from "./ClinicDashboard";

const Dashboard = () => {
    const { user, isAuthenticated, loginWithRedirect} = useAuth0();
    const [getUser, setUser] = useState(null);
  
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
            return response.user;
          }).then(userExists => {
            if (userExists){
              setUser(userExists);
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
    {isAuthenticated ? (getUser && getUser.isClinic ? <ClinicDashboard /> : <PatientDashboard />) : <Navigate to={loginWithRedirect()} />}
    </>
  );
};

export default Dashboard;