import { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { IRecipe } from './@types/recipe';
import './App.css';
import RecipeDetail from './components/RecipeDetail';
import Modal from './components/Modal';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);

  const navigate = useNavigate();

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
      const timer = setTimeout(() => setIsNavOpen(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isNavOpen]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const openModal = (recipe: IRecipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div className={`body ${isNavOpen ? 'nav-active' : ''}`}>
      {isNavOpen && (
        <div className="navbar">
          <nav onClick={toggleNav}>
            <h2>Accueil</h2>
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.id}><Link to={`/recipe/${recipe.slug}`}>{recipe.title}</Link></li>
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

        <h1>Les recettes oRecipes</h1>
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedRecipe && (
          <div className="recipe-detail">
            <h2>{selectedRecipe.title}</h2>
            <img src={selectedRecipe.thumbnail} alt={selectedRecipe.title} />
            <p>{selectedRecipe.description}</p>
            <h3>Ingrédients</h3>
            <ul>
              {selectedRecipe.ingredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <ol>
              {selectedRecipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;