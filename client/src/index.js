import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));


const providerConfig = {
  domain: "https://dev-8ytwn8nglpbeo6k7.us.auth0.com",
  clientId: "o0UNRj0w4vAbiQQLqxkiYQkh6vphHKu2",
  redirectUri: "http://localhost:3000/dashboard"
};

root.render(
  <React.StrictMode>
    <Auth0Provider
      {...providerConfig}>
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
