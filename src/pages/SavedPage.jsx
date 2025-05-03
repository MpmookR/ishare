// import { useEffect, useState, useContext } from "react";
// import { AppContext } from "../context/AppContext";
// import HighlightCard from "../components/HighlightCard";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// export default function SavedPage() {
//   const { token, currentUser } = useContext(AppContext);
//   const [savedRecipes, setSavedRecipes] = useState([]);

//   useEffect(() => {
//     const loadSaved = async () => {
//       try {
//         const response = await fetch(`/api/savedrecipes/user/${currentUser.id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         const data = await response.json();
//         setSavedRecipes(data);
//       } catch (error) {
//         console.error("Failed to load saved recipes", error);
//       }
//     };

//     if (token && currentUser?.id) {
//       loadSaved();
//     }
//   }, [token, currentUser]);

//   return (
//     <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
//       <Navbar />

//       {/* <section className="container my-5">
//         <h2
//           style={{
//             fontFamily: "var(--font-body)",
//             fontSize: "var(--font-size-h2)"
//           }}
//         >
//           Your Saved Recipes
//         </h2>

//         {savedRecipes.length === 0 ? (
//           <p>You haven’t saved any recipes yet.</p>
//         ) : (
//           <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
//             {savedRecipes.map((item, index) => (
//               <HighlightCard
//                 key={index}
//                 recipe={{
//                   ...item.recipe,
//                   UserName: item.recipe.userName,
//                   RecipeId: item.recipe.recipeId,
//                   Image: item.recipe.image,
//                   Intro: item.recipe.intro
//                 }}
//                 variant={index % 2 === 0 ? "blue" : "green"}
//                 defaultSaved={true}
//               />
//             ))}
//           </div>
//         )}
//       </section> */}

//       <Footer />
//     </div>
//   );
// }

  