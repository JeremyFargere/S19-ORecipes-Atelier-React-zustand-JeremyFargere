import { useState, useEffect } from 'react';
import { NavLink, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { IRecipe } from './@types/recipe';
import './App.css';
import RecipeDetail from './components/RecipeDetail';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch('https://orecipesapi.onrender.com/api/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (isNavOpen) {
      const timer = setTimeout(() => setIsNavOpen(false), 120000);
      return () => clearTimeout(timer);
    }
  }, [isNavOpen]);

  useEffect(() => {
    if (location.pathname.startsWith('/recipe/')) {
      const slug = location.pathname.split('/recipe/')[1];
      const recipe = recipes.find((r) => r.slug === slug);
      if (recipe) {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(false);
      setSelectedRecipe(null);
    }
  }, [location, recipes]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    navigate('/');
  };

  const openModal = (recipe: IRecipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
    navigate(`/recipe/${recipe.slug}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`body ${isNavOpen ? 'nav-active' : ''}`}>
      {isNavOpen && (
        <div className="navbar">
          <nav>
            <ul>
              <li><NavLink to={`/`}>Accueil</NavLink></li>
              {recipes.map((recipe) => (
                <li key={recipe.id}>
                  <NavLink
                    to={`/recipe/${recipe.slug}`}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    {recipe.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <div className={`header ${isNavOpen ? 'header-shrunk' : 'header-full'}`}>
        <div className="header-content">
          <img
            className="logo"
            src="/img/logo.png"
            alt="Logo"
            onClick={toggleNav}
            style={{ cursor: 'pointer' }}
          />
          <form>
            <input type="email" placeholder="Adresse mail" />
            <input type="password" placeholder="Mot de passe" />
            <button type="submit">OK</button>
          </form>
        </div>

        {location.pathname === '/' && <h1>Les recettes oRecipes</h1>}
        <div className="recipe-content">
          <Routes>
            <Route path="/" element={
              <>
                {loading && <p>Chargement...</p>}
                {!loading && recipes.map((recipe) => (
                  <div key={recipe.id} className={`recipe-card ${isNavOpen ? 'nav-active' : ''}`}>
                    <img className="recipe-image" src={recipe.thumbnail} alt={recipe.title} />
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <p className="recipe-difficulty">Difficulté: {recipe.difficulty}</p>
                    <button className="recipe-button" onClick={() => openModal(recipe)}>Voir la recette</button>
                  </div>
                ))}
              </>
            } />
            <Route path="/recipe/:slug" element={<RecipeDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;