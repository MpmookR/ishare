// src/main.jsx

import React from 'react'; //Needed for JSX & React.StrictMode
import ReactDOM from 'react-dom/client'; //React 18 render API
import { BrowserRouter } from 'react-router-dom'; //Routing
import App from './App.jsx'; // Your main App component
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { AppContext, AppProvider } from './context/AppContext.jsx';

// Render the app into the root div in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
