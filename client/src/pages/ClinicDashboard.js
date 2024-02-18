import React from "react";


const ClinicDashboard = ({ user }) => {
  return ( 
      <section>
        <div className="card import">
          <p className="card-title">Import EMR</p>
          <div className="card-heading">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 19V9M10 9L7 12M10 9L13 12M5 14.8184C2.69636 14.2074 1 12.1246 1 9.6493C1 7.20008 2.8 4.9375 5.5 4.5C6.34694 2.48637 8.3514 1 10.6893 1C13.684 1 16.1317 3.32251 16.3 6.25C17.8893 6.94488 19 8.6503 19 10.4969C19 12.8148 17.25 14.7236 15 14.9725" stroke="#6A6A6A" stroke-width="1.58" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div>
              <h3>Import EMR from Patient</h3>
              <input type="text" placeholder="Enter Health Card"/>
            </div>
            <div>
              <p>{user.firstName} {user.lastName}</p>
              <p>{user.email}</p>
            </div>
            <button>Confirm</button>
          </div>
        </div>
        <div className="card date-range">
          <p className="card-title">Auto Date Range</p>
        </div>
        <div className="card upload">
          <p className="card-title">Upload Patient Documents</p>
        </div>
        <div className="card health-info">
          <p className="card-title">Health Info</p>
        </div>
        <div className="card assistant">
          <p className="card-title">AI Assistant</p>            
        </div>
      </section>
  );
};

export default ClinicDashboard;