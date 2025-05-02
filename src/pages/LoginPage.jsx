import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AppContext } from "../context/AppContext";
import TextField from "../components/TextField";
import Button from "../components/Button";

export default function LoginPage() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call loginUser to get token and user from backend
      const { user, token } = await loginUser(email, password);

      // Pass token and user to context login
      login(token, user);

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid login.");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0" style={{ height: "100vh", overflow: "hidden" }}>
        {/* Image Column */}
        <div
          className="col-md-6 d-none d-md-block"
          style={{ height: "100vh", overflow: "hidden" }}
        >
          <img
            src="/img/preview.png"
            alt="Food preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Form Column */}
        <div
          className="col-md-6 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "var(--color-bg)",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <div style={{ width: "100%", maxWidth: 400 }}>
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-h2)",
                fontWeight: "var(--font-weight-bold)",
              }}
            >
              Welcome...
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16 }}>
              Please log in to continue.
            </p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="mt-4">
              <TextField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <div className="mt-3">
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              <div className="mt-4">
                <Button type="submit">Login</Button>
              </div>

              <div className="d-flex justify-content-center mt-3">
                <p
                  className="mt-3"
                  style={{ fontFamily: "var(--font-body)", fontSize: 16 }}
                >
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    style={{
                      color: "var(--color-primary-orange)",
                      textDecoration: "none",
                    }}
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
