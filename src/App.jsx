import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import SavedPage from "./pages/SavedPage"; 
import CreateRecipe from './pages/CreateRecipe';
import MyRecipe from "./pages/MyRecipe.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<SearchResults />} /> 
      <Route path="/saved" element={<SavedPage />} />  
      <Route path="/create" element={<CreateRecipe />} />
      <Route path="/myRecipe" element={<MyRecipe />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/admin/dashboard" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
