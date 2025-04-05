import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchRecipes } from '../services/recipeService';
import Button from '../components/common/Button';

export default function HomePage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        console.log("Calling backend...");
        const data = await fetchRecipes();
        console.log("Fetched data:", data);

        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error("Unexpected API response: not an array", data);
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
    };

    loadRecipes();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-h1)' }}>
          Welcome to HomePage
        </h1>
        <div style={{ maxWidth: 150 }}>
          <Button variant="orange" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-h2)' }}>All Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found or still loading...</p>
      ) : (
        <ul>
          {recipes.map((r, index) => (
            <li key={r.recipeId || index}>{r.Name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}