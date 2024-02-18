
import {React, useState, useEffect} from "react";


const PatientDashboard = ({ user }) => {
  const [isVerified, setIsVerified] = useState(user.isVerified);
  const [data, setData] = useState({});
  const [userPrompt, setUserPrompt] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');


  useEffect(() => {
    // Fetch the patient data from your server
    fetch('http://localhost:3002/patientData')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching patient data:', error);
      });
  }, []); 

  const fetchAssistantData = () => {
    // Ensure there is a prompt to send
    if (!userPrompt.trim()) {
      alert('Prompt cannot be empty.');
      return;
    }

    // Send the prompt to the assistant endpoint
    fetch(`http://localhost:3002/assistant?prompt=${encodeURIComponent(userPrompt)}`)
      .then(response => response.json())
      .then(data => {
        setAssistantResponse(data);
      })
      .catch(error => {
        console.error('Error fetching assistant data:', error);
      });
  };






  return (
      <div class="container">
        {/* <div class="login-info">
          <h1>Welcome, {user.firstName}!</h1>
          <p>{user.email}</p>
        </div> */}
        <div class="date-range-card">
          <h2>Date Range</h2>
          <div class="titles">
            <svg class="icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M1 8.48611H20.25M5.27778 1V3.13889M15.9722 1V3.13889M4.42222 20.25H16.8278C18.0257 20.25 18.6247 20.25 19.0822 20.0169C19.4846 19.8118 19.8118 19.4846 20.0169 19.0822C20.25 18.6247 20.25 18.0257 20.25 16.8278V6.56111C20.25 5.36322 20.25 4.76427 20.0169 4.30674C19.8118 3.90428 19.4846 3.57707 19.0822 3.37202C18.6247 3.13889 18.0257 3.13889 16.8278 3.13889H4.42222C3.22434 3.13889 2.62538 3.13889 2.16785 3.37202C1.76539 3.57707 1.43818 3.90428 1.23313 4.30674C1 4.76427 1 5.36322 1 6.56111V16.8278C1 18.0257 1 18.6247 1.23313 19.0822C1.43818 19.4846 1.76539 19.8118 2.16785 20.0169C2.62538 20.25 3.22433 20.25 4.42222 20.25Z" stroke="#6A6A6A" stroke-width="1.58" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1>This Month</h1>
          </div>
        </div>

        <div class="health-info-card">
          <h2>Health Info</h2>
          <h1>Your Health Statistics</h1>
          <div class="health-info-data">
    
          {Object.entries(data).map(([testName, testDetails]) => (
            <div class="row" key={testName}>
              <h2>{testName}</h2>
              <p>Result: {testDetails.Result}</p>
              <p>Units: {testDetails.Units}</p>
              <p>Reference Range: {testDetails['Reference Range']}</p>
            </div>
          ))}

          </div>
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