// src/main.jsx

import React from 'react'; //Needed for JSX & React.StrictMode
import ReactDOM from 'react-dom/client'; //React 18 render API
import { BrowserRouter } from 'react-router-dom'; //Routing
import App from './App.jsx'; // Your main App component
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



import { AuthProvider } from './context/AuthContext.jsx'; // Wrap the app with auth context

// Render the app into the root div in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
