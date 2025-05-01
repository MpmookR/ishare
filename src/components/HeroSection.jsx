import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="container my-5">
      <div className="row justify-content-center g-4">
        {/* Left: Hero Banner */}
        <div className="col-lg-8 col-md-12">
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

        {/* Right: Share Your Recipe Card */}
        <div className="col-lg-4 col-md-6 col-sm-10 d-none d-sm-block">
          <div
            onClick={() => navigate("/create")}
            style={{
              cursor: "pointer",
              borderRadius: "21px",
              border: "2px solid black",
              height: "100%",
              minHeight: "300px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background Image with Blur */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/img/addRecipeImg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(2px)",
                zIndex: 0,
              }}
            />

            {/* Green Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(2, 76, 75, 0.91)",
                zIndex: 1,
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#FEF3DF",
                gap: "20px",
                padding: "20px",
              }}
            >
              {/* Orange Circle with Plus Sign */}
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: "var(--color-primary-orange)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "3px 4px 14px rgba(0, 0, 0, 0.15)",
                  transition: "transform 0.3s ease",
                }}
                className="hover-effect"
              >
                <FiPlus size={60} color="#fff" style={{ fontWeight: "bold" }} />
              </div>

              {/* Text */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "28px",
                  fontStyle: "italic",
                  lineHeight: "36px",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Share Your Recipe
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
