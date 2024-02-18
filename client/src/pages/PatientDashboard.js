import React from "react";

const PatientDashboard = ({ user }) => {
  console.log(user);
  return (
      <div>
        <h1>Hello, {user.firstName}!</h1>
        <h2>Patient</h2>
        <p>{user.email}</p>
      </div>
  );
};

export default PatientDashboard;