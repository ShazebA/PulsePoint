import { React, useState, useEffect } from "react";

const PatientDashboard = ({ user }) => {
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

  const [healthCard, setHealthCard] = useState('');

  const submitHealthCard = () => {
    // Call the backend endpoint to hash and save the health card data
    fetch('http://localhost:3002/updateHealthCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ healthCard }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Health card updated successfully!');
        } else {
          alert('Failed to update health card.');
        }
      })
      .catch(error => {
        console.error('Error updating health card:', error);
      });
  };


  return (
      <div class="container">
      <div class="card-row">
        <div class="health-card-input-card">
          <h2>Add Health Card</h2>
          <div className="health-card-input">
            <input
              type="text"
              value={healthCard}
              onChange={(e) => setHealthCard(e.target.value)}
              placeholder="0784-711-822-AG"
            />
            <button onClick={submitHealthCard}>Submit</button>
          </div>
        </div>

        <div class="date-range-card">
          <h2>Date Range</h2>
          <div className="health-card-input">
            <div class="titles">
              <svg class="icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8.48611H20.25M5.27778 1V3.13889M15.9722 1V3.13889M4.42222 20.25H16.8278C18.0257 20.25 18.6247 20.25 19.0822 20.0169C19.4846 19.8118 19.8118 19.4846 20.0169 19.0822C20.25 18.6247 20.25 18.0257 20.25 16.8278V6.56111C20.25 5.36322 20.25 4.76427 20.0169 4.30674C19.8118 3.90428 19.4846 3.57707 19.0822 3.37202C18.6247 3.13889 18.0257 3.13889 16.8278 3.13889H4.42222C3.22434 3.13889 2.62538 3.13889 2.16785 3.37202C1.76539 3.57707 1.43818 3.90428 1.23313 4.30674C1 4.76427 1 5.36322 1 6.56111V16.8278C1 18.0257 1 18.6247 1.23313 19.0822C1.43818 19.4846 1.76539 19.8118 2.16785 20.0169C2.62538 20.25 3.22433 20.25 4.42222 20.25Z" stroke="#444" stroke-width="1.58" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <h1>This Month</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="health-info-card">
        <h2>Health Info</h2>
        <div class="titles">
          <svg class="icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 21H14C19 21 21 19 21 14V8C21 3 19 1 14 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21Z" stroke="#444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 11.7001L7 11.6801C7.75 11.6801 8.59 12.2501 8.87 12.9501L10.01 15.8301C10.27 16.4801 10.68 16.4801 10.94 15.8301L13.23 10.0201C13.45 9.46011 13.86 9.44011 14.14 9.97011L15.18 11.9401C15.49 12.5301 16.29 13.0101 16.95 13.0101H21.01" stroke="#444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h1>Your Health Statistics</h1>
        </div>
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

      <div class="card-row">
        <div class="ai-assistant-card">
          <h2>AI Assistant</h2>
          <div class="titles">
            <svg class="icon" width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.181 7.78531C20.3126 7.43316 20.3845 7.05193 20.3845 6.65374C20.3845 4.86955 18.938 3.42297 17.1538 3.42297C16.9841 3.42297 16.8186 3.43872 16.6558 3.46376C17.5451 3.94313 18.148 4.8752 18.148 5.94701C18.148 6.29553 18.0842 6.6291 17.9679 6.93724C18.9202 7.3956 19.5768 8.36241 19.5768 9.48065C19.5768 11.0419 18.2975 12.3076 16.7188 12.3076C16.4721 12.3076 16.233 12.2769 16.0044 12.2187V12.3076C16.0044 13.8688 14.7246 15.1345 13.1464 15.1345C12.3335 15.1345 11.6001 14.7989 11.0799 14.2602C11.0799 14.2602 10.6922 15.5383 8.67301 15.5383C7.05763 15.5383 6.71598 14.4278 6.71598 14.4278C5.65023 14.4278 4.72219 13.8495 4.23071 12.9937V13.1153C4.23071 14.8999 5.67729 16.346 7.46148 16.346V20.3845L12.3944 16.1546C12.9828 16.7705 13.8119 17.1537 14.7307 17.1537C16.5149 17.1537 17.9615 15.7075 17.9615 13.923L17.9619 13.8212C18.2199 13.8878 18.4901 13.923 18.7691 13.923C20.5533 13.923 21.9999 12.4768 21.9999 10.6922C21.9999 9.41402 21.2576 8.3095 20.181 7.78531Z" fill="#2D2D2D" fill-opacity="0.25"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1806 7.78541C20.3123 7.43326 20.3846 7.05203 20.3846 6.65383C20.3846 4.86965 18.938 3.42307 17.1538 3.42307C16.5343 3.42307 15.9552 3.59753 15.4637 3.90001L15.4641 3.90082C15.1249 2.24546 13.6601 1 11.9038 1C10.1471 1 8.68195 2.24586 8.34312 3.90203L8.34554 3.90122C7.85366 3.59794 7.27414 3.42307 6.65383 3.42307C4.86965 3.42307 3.42307 4.86965 3.42307 6.65383C3.42307 6.68776 3.42348 6.72168 3.42469 6.7556C2.02698 7.11139 1 8.37624 1 9.8846C1 11.6692 2.44657 13.1154 4.23076 13.1154C4.23076 14.9 5.67734 16.3461 7.46153 16.3461V20.3846L12.3945 16.1547C12.9829 16.7706 13.812 17.1538 14.7307 17.1538C16.5149 17.1538 17.9615 15.7076 17.9615 13.9231L17.9619 13.8213C18.22 13.8879 18.4901 13.9231 18.7692 13.9231C20.5534 13.9231 22 12.4769 22 10.6923C22 9.41412 21.2577 8.3096 20.1806 7.78541Z" stroke="#444" stroke-width="1.58" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1>Discover AI Health Insights</h1>
          </div>
          <div className="assistant-interaction">
            <input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Ask for AI to analyze the data..."
            />
            <button onClick={""}>Submit</button>
          </div>

          {assistantResponse && (
            <div className="assistant-response">
              <h2>Assistant's Response</h2>
              <p>{assistantResponse}</p>
            </div>
          )}

        </div>

        <div class="send-to-clinic-card">
          <h2>Send to Clinic</h2>
          <h1>Send EMR to Clinic</h1>
        </div>

        <div class="upload-documents-card">
          <h2>Upload Documents</h2>
          <h1>Send EMR to Clinic</h1>
        </div>
        <h1>Hello, {user.firstName}!</h1>
        <h2>Patient</h2>
        <p>{user.email}</p>
      </div>

    </div>
  );
};

export default PatientDashboard;