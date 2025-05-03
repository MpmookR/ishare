import { useState, useContext } from "react";
import { createRecipe } from "../services/recipeService";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import TextFieldInput from "../components/recipeForm/TextFieldInput";
import SelectField from "../components/recipeForm/SelectField";
import TextAreaField from "../components/recipeForm/TextAreaField";
import ImagePicker from "../components/ImagePicker";
import { MdAddPhotoAlternate } from "react-icons/md";

const CreateRecipe = () => {
  const { token, user, updateUserFromServer } = useContext(AppContext);
  const navigate = useNavigate();


  const [formErrors, setFormErrors] = useState({}); // handle error

  const [form, setForm] = useState({
    name: "",
    category: "",
    intro: "",
    ingredients: "",
    howTo: "",
    image: "",
  });

  const [showImagePicker, setShowImagePicker] = useState(false);

  const categoryOptions = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Healthy",
    "Drink",
  ];

  const imageOptions = [
    "/img/createImg/Aperolspritz.jpg",
    "/img/createImg/BananaOatPancake.jpg",
    "/img/createImg/Beefshawarma.webp",
    "/img/createImg/BrownieCookies.jpg",
    "/img/createImg/chickenteriyaki.jpg",
    "/img/createImg/FermentedLemonHoney.jpg",
    "/img/createImg/GrilledChickenKaleSalad.jpg",
    "/img/createImg/LunchSandwich.jpeg",
    "/img/createImg/salmonpokebowl.jpg",
    "/img/createImg/strawberryShortCake.jpg",
    "/img/createImg/VanillaFrenchToast.jpg",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      alert("You must be logged in to create a recipe.");
      return;
    }

    // Basic field validation
    const errors = {};
    if (!form.name.trim()) errors.name = 'Recipe Name is required.';
    if (!form.category.trim()) errors.category = 'Category is required.';
    if (!form.intro.trim()) errors.intro = 'About is required.';
    if (!form.ingredients.trim()) errors.ingredients = 'Ingredients are required.';
    if (!form.howTo.trim()) errors.howTo = 'Instructions are required.';
    if (!form.image.trim()) errors.image = 'Image must be selected.';
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const imageUrl = form.image.startsWith("http")
        ? form.image
        : `${window.location.origin}${form.image}`;

      const payload = {
        ...form,
        image: imageUrl,
        userId: user.Id,
      };

      console.log("Submitting recipe payload:", payload);

      await createRecipe(payload, token);

      await updateUserFromServer();

      alert("Recipe created successfully!");
      navigate("/myrecipe");
    } catch (err) {
      console.error("Create recipe error:", err);
      alert("Failed to create recipe. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <div className="container py-5" style={{ flex: 1 }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "24px",
            padding: "16px",
          }}
        >
          {/* Left Column */}
          <div className="col-lg-6 d-flex flex-column" style={{ gap: "16px" }}>
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-h2)",
                marginBottom: "36px",
              }}
            >
              Create a New Recipe
            </h2>

            <TextFieldInput
              label="Recipe Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Grilled Chicken Salad"
              error={!!formErrors.name}
              errorMessage={formErrors.name}              
            />

            <SelectField
              label="Category"
              name="category"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              options={categoryOptions}
              error={!!formErrors.category}
              errorMessage={formErrors.category}     
            />

            <TextAreaField
              label="About Recipe"
              name="intro"
              value={form.intro}
              onChange={handleChange}
              placeholder="Intro must be a maximum of 300 characters"
              error={!!formErrors.intro}
              errorMessage={formErrors.intro}

            />

            <TextAreaField
              label="Ingredient"
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              placeholder="List ingredients here"
              error={!!formErrors.ingredients}
              errorMessage={formErrors.ingredients}
            />

            <TextAreaField
              label="How to"
              name="howTo"
              value={form.howTo}
              onChange={handleChange}
              placeholder="Write cooking instructions here"
              error={!!formErrors.howTo}
              errorMessage={formErrors.howTo}
            />
          </div>

          {/* Right Column */}
          <div
            className="col-lg-5 d-flex flex-column align-items-center"
            style={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            {/* Clickable Thumbnail Placeholder */}
            <div
              onClick={() => setShowImagePicker(true)}
              style={{
                justifyContent: "center",
                width: "100%",
                height: "250px",
                border: form.image
                  ? "2px solid transparent"
                  : "2px dashed #ccc",
                borderRadius: "16px",
                backgroundColor: form.image
                  ? "transparent"
                  : "var(--color-primary-green)",
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                position: "relative",
                transition: "0.3s",
              }}
            >
              {form.image ? (
                <img
                  src={form.image}
                  alt="thumbnail"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                  }}
                />
              ) : (
                <div style={{ textAlign: "center", color: "white" }}>
                  <MdAddPhotoAlternate size={48} color="white" />
                  <div
                    style={{
                      fontSize: "var(--font-size-foot)",
                      fontFamily: "var(--font-body)",
                      marginTop: "8px",
                    }}
                  >
                    Add Recipe Thumbnail
                  </div>
                </div>
              )}
            </div>

            {/* pop up folder */}
            <ImagePicker
              show={showImagePicker}
              onClose={() => setShowImagePicker(false)}
              imageList={imageOptions}
              selectedImage={form.image}
              onSelect={(url) => setForm({ ...form, image: url })}
            />
          </div>

          {/* Centered Submit Button */}
          <div className="col-12 d-flex justify-content-center mt-4">
            <Button type="submit" variant="orange">
              Share Recipe
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateRecipe;
