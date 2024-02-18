
import {React, useState} from "react";


const PatientDashboard = ({ user }) => {
  const [isVerified, setIsVerified] = useState(user.isVerified);
  return (
      <div>
        <h1>Hello, {user.firstName}!</h1>
        <h2>Patient</h2>
        <p>{user.email}</p>
      </div>
  );
};

export default PatientDashboard;