export default function CategorySelector({ selectedCategory, onSelect }) {
    const categories = [
      { name: "All", image: "/img/catImage/all.jpg", isAll: true },
      { name: "Breakfast", image: "/img/catImage/breakfast.jpg" },
      { name: "Lunch", image: "/img/catImage/lunch.jpg" },
      { name: "Dinner", image: "/img/catImage/dinner.jpg" },
      { name: "Dessert", image: "/img/catImage/dessert.jpg" },
      { name: "Healthy", image: "/img/catImage/healthy.jpg" },
      { name: "Drink", image: "/img/catImage/drink.jpg" },
    ];
  
    return (
      <section className="my-5">
        <h2 style={{ fontSize: 32, fontFamily: "var(--font-body)" }}>Category</h2>
        <div className="custom-scroll" style={{ display: "flex", overflowX: "auto", gap: "24px", paddingBottom: "8px" }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name || (cat.isAll && selectedCategory === "All");
            return (
              <div
                key={cat.name}
                onClick={() => onSelect(cat.name)}
                style={{
                  cursor: "pointer",
                  flex: "0 0 auto",
                  width: 180,
                  padding: "8px 8px",
                  borderRadius: 21,
                  background: isSelected ? "var(--color-primary-blue)" : "transparent",
                  outline: isSelected ? "2px solid var(--color-primary-orange)" : "1px solid black",
                  outlineOffset: isSelected ? "-2px" : "-1px",
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%", // ensures perfect circle
                    objectFit: "cover",
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <div
                  style={{
                    color: isSelected ? "var(--color-bg)" : "black",
                    fontSize: 18,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {cat.name}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  