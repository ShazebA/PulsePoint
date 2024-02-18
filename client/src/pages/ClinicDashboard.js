import {React, useState, useEffect} from "react";


const ClinicDashboard = ({ user }) => {
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
      <section className="container">
        <div className="card import">
          <p className="card-title">Import EMR</p>
          <div className="class-heading-container">
            <div className="card-heading">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 19V9M10 9L7 12M10 9L13 12M5 14.8184C2.69636 14.2074 1 12.1246 1 9.6493C1 7.20008 2.8 4.9375 5.5 4.5C6.34694 2.48637 8.3514 1 10.6893 1C13.684 1 16.1317 3.32251 16.3 6.25C17.8893 6.94488 19 8.6503 19 10.4969C19 12.8148 17.25 14.7236 15 14.9725" stroke="#6A6A6A" stroke-width="1.58" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
                <h3>Import EMR from Patient</h3>
            </div>
            <input type="text" value={healthCard}
              onChange={(e) => setHealthCard(e.target.value)} placeholder="Enter Health Card"/>
          </div>
            <div className="text-content">
              <p>{user.firstName} {user.lastName}</p>
              <p>{user.email}</p>
            </div>
            <button onClick={submitHealthCard}>Confirm</button>
        </div>
        <div className="card date-range">
          <p className="card-title">Auto Date Range</p>
          <div className="card-heading">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 8.48611H20.25M5.27778 1V3.13889M15.9722 1V3.13889M4.42222 20.25H16.8278C18.0257 20.25 18.6247 20.25 19.0822 20.0169C19.4846 19.8118 19.8118 19.4846 20.0169 19.0822C20.25 18.6247 20.25 18.0257 20.25 16.8278V6.56111C20.25 5.36322 20.25 4.76427 20.0169 4.30674C19.8118 3.90428 19.4846 3.57707 19.0822 3.37202C18.6247 3.13889 18.0257 3.13889 16.8278 3.13889H4.42222C3.22434 3.13889 2.62538 3.13889 2.16785 3.37202C1.76539 3.57707 1.43818 3.90428 1.23313 4.30674C1 4.76427 1 5.36322 1 6.56111V16.8278C1 18.0257 1 18.6247 1.23313 19.0822C1.43818 19.4846 1.76539 19.8118 2.16785 20.0169C2.62538 20.25 3.22433 20.25 4.42222 20.25Z" stroke="#6A6A6A" stroke-width="1.58" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

                <h3>This Month</h3>
            </div>
        </div>
        <div className="card upload">
          <p className="card-title">Upload Patient Documents</p>
          <div className="card-heading">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 19V9M10 9L7 12M10 9L13 12M5 14.8184C2.69636 14.2074 1 12.1246 1 9.6493C1 7.20008 2.8 4.9375 5.5 4.5C6.34694 2.48637 8.3514 1 10.6893 1C13.684 1 16.1317 3.32251 16.3 6.25C17.8893 6.94488 19 8.6503 19 10.4969C19 12.8148 17.25 14.7236 15 14.9725" stroke="#6A6A6A" stroke-width="1.58" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
                <h3>This Month</h3>
            </div>
        </div>
        <div className="card health-info">
          <p className="card-title">Health Info</p>
          <div className="card-heading">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 19V9M10 9L7 12M10 9L13 12M5 14.8184C2.69636 14.2074 1 12.1246 1 9.6493C1 7.20008 2.8 4.9375 5.5 4.5C6.34694 2.48637 8.3514 1 10.6893 1C13.684 1 16.1317 3.32251 16.3 6.25C17.8893 6.94488 19 8.6503 19 10.4969C19 12.8148 17.25 14.7236 15 14.9725" stroke="#6A6A6A" stroke-width="1.58" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
                <h3>Your Patient's Health Statistics</h3>
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
        <div className="card assistant">
          <p className="card-title">AI Assistant</p>        
          <div className="assistant-interaction">
            <input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Ask a question..."
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
      </section>
  );
};

export default ClinicDashboard;