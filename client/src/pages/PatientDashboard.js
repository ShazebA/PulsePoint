
import {React, useState} from "react";


const PatientDashboard = ({ user }) => {
  const [isVerified, setIsVerified] = useState(user.isVerified);
  return (
      <div class="container">
        {/* <div class="login-info">
          <h1>Welcome, {user.firstName}!</h1>
          <p>{user.email}</p>
        </div> */}
        <div class="date-range-card">
          <h2>Date Range</h2>
          <h1>This Month</h1>
        </div>

        <div class="health-info-card">
          <h2>Health Info</h2>
          <h1>Your Health Statistics</h1>
        </div>

        <div class="bottom-cards-container">
          <div class="ai-assistant-card">
            <h2>AI Assistant</h2>
            <h1>Discover AI Health Insights</h1>
          </div>

          <div class="send-to-clinic-card">
            <h2>Send to Clinic</h2>
            <h1>Send EMR to Clinic</h1>
          </div>
        </div>
      </div>
  );
};

export default PatientDashboard;