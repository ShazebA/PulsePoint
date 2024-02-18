import {React, Navigate, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PatientDashboard from "./PatientDashboard";
import ClinicDashboard from "./ClinicDashboard";
import Nav from "../components/Nav";

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

            // setUser(data);
            if (data){
              setUser(data);
            }
            console.log("User Info: " + JSON.stringify(getUser));
          }).catch(err => {
            console.log(err);
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
    <Nav />
    {isAuthenticated ? (getUser && getUser.isClinic ? <ClinicDashboard user={getUser} /> : <PatientDashboard user={getUser} /> ) : <Navigate to={loginWithRedirect()} />}
    </>
  );
};

export default Dashboard;