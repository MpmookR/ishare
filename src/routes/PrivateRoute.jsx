// Import useContext to access AuthContext
import { useContext } from 'react';

// Import the AuthContext to check user authentication
import { AuthContext } from '../context/AuthContext';

// Import Navigate to redirect unauthenticated users
import { Navigate } from 'react-router-dom';

// Define a functional component called PrivateRoute that receives 'children'
export default function PrivateRoute({ children }) {
  // Get the 'token' from the AuthContext (set after login)
  const { token } = useContext(AuthContext);

  // If token exists, render the protected children components
  // If not, redirect to /login page
  return token ? children : <Navigate to="/login" />;
}



