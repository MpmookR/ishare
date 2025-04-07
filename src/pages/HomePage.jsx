import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchRecipes } from "../services/recipeService";
import Button from "../components/common/Button";
import Navbar from "../components/common/Navbar";

export default function HomePage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
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
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section */}
      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-11 col-sm-12">
            <img
              src="/img/thumbnail.png"
              alt="Banner"
              className="img-fluid"
              style={{
                width: "100%",
                borderRadius: "21px",
                border: "2px solid black",
                display: "block",
              }}
            />
          </div>
        </div>
      </section>

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-h1)",
            }}
          >
            Welcome to HomePage
          </h1>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-h2)",
          }}
        >
          All Recipes
        </h2>
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
    </div>
  );
}
