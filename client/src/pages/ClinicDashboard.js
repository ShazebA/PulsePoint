import React from "react";


const ClinicDashboard = ({ user }) => {
  return ( 
      <div>
        <h1>Hello, {user.firstName}!</h1>
        <h2>Clinic</h2>
        <p>{user.email}</p>
      </div>
  );
};

export default ClinicDashboard;