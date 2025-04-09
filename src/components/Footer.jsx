import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div
        style={{
          backgroundColor: "var(--color-primary-blue)",
          width: "100%",
        }}
      >
        <footer
          className="container d-flex justify-content-between align-items-center py-4 flex-wrap"
          style={{
            color: "var(--color-bg)",
            fontSize: "var(--font-size-footer)",
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-normal)",
            lineHeight: "16.8px",
          }}
        >
          <div>© 2025, iShare. All rights reserved.</div>
          <>

      
          <Link to="/" style={{ display: "inline-block" }}>
            <img
              style={{ width: 60, height: 42 }}
              src="/img/Logowhite.png"
              alt="Logo"
            />
          </Link>
          </>
        </footer>
      </div>
    );
  }