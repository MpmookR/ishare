import { FiSearch, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const { user } = useContext(AppContext);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const profileImage = user?.profileImage || "/img/profile/profileDefault.jpg";

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <style>
        {`
    .dropdown-toggle::after {
      display: none !important;
    }
    .dropdown-menu.show > li > a.dropdown-item:hover {
      background-color: var(--color-primary-orange) !important;
      color: white !important;
    }
    .dropdown-item {
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    @media (max-width: 576px) {
      .responsive-search {
        display: none !important;
      }
    }
  `}
      </style>

      <div
  className="container d-flex justify-content-between align-items-center py-4 border-bottom flex-wrap"
  style={{
          width: "100%",
          paddingTop: 56,
          paddingBottom: 16,
          paddingRight: 12,
          paddingLeft: 20,
          borderBottom: "1px var(--color-primary-blue) solid",
          backgroundColor: "var(--color-bg)",
          gap: 16,
        }}
      >
        {/* Logo*/}
        <div
          style={{
            overflow: "hidden",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Link to="/" style={{ display: "inline-block" }}>
            <img
              style={{ width: 60, height: 42 }}
              src="/img/LogoOrange.png"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div
          className="responsive-search"
          style={{
            flex: "1 1 300px",
            maxWidth: 500,
            height: 42,
            position: "relative",
            background: "var(--color-primary-blue)",
            overflow: "hidden",
            borderRadius: 21,
            outline: "1.5px var(--color-black) solid",
            outlineOffset: "-1.5px",
            display: "flex",
            alignItems: "center",
            paddingLeft: 30,
            paddingRight: 60,
            minWidth: 240,
          }}
        >
          <input
            type="text"
            placeholder="looking for recipe...?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              color: "var(--color-bg)",
              fontSize: 16,
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-normal)",
              lineHeight: "24px",
            }}
          />

          {/* Search icon */}
          <div
            style={{
              position: "absolute",
              right: 24,
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleSearch}
          >
            <FiSearch size={20} color="var(--color-bg)" />
          </div>
          </div>


          {/* Avatar Link + Dropdown Menu */}
          <div className="d-flex align-items-center gap-3">
            {/* Avatar as profile link */}
            <Link to="/myRecipe">
              <img
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "9999px",
                  outline: "3px var(--color-primary-orange) solid",
                }}
                src={profileImage}
                alt="User"
              />
            </Link>

            {/* Dropdown using custom icon */}
            <div
              className="dropdown"
              style={{ position: "relative", zIndex: 9999 }}
            >
              <button
                className="btn dropdown-toggle p-0 border-0 bg-transparent"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FiChevronDown size={20} color="var(--color-primary-orange)" />
              </button>

              <ul
                className="dropdown-menu dropdown-menu-end mt-2"
                aria-labelledby="dropdownMenuButton"
                style={{
                  zIndex: 9999,
                  position: "absolute",
                  top: "100%",
                  right: 0,
                }}
              >
                <li>
                  <Link to="/myRecipe" className="dropdown-item">
                    My Recipes
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link to="/login" className="dropdown-item">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </>
  );
}
