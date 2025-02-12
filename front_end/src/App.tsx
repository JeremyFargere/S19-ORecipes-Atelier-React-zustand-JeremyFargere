import { useState, useEffect } from 'react'
import { IRecipe } from './@types/recipe'
import './App.css'

function App() {
  // État pour gérer l'ouverture de la navigation
  const [isNavOpen, setIsNavOpen] = useState(false)
  // État pour stocker les recettes
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  // État pour gérer le chargement des données
  const [loading, setLoading] = useState(true)

  // Utilisation de useEffect pour récupérer les recettes à partir de l'API
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch('https://orecipesapi.onrender.com/api/recipes')
        const data = await response.json()
        setRecipes(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])

  // Ferme automatiquement la nav après 10s
  useEffect(() => {
    if (isNavOpen) {
      const timer = setTimeout(() => setIsNavOpen(false), 30000)
      return () => clearTimeout(timer)
    }
  }, [isNavOpen])

  // Bascule l'état ouvert/fermé de la navigation
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <>
      <div className="body">
        {/* Navbar conditionnelle */}
        {isNavOpen && (
          <div className="navbar">
            <nav onClick={toggleNav}>
              <h2>Accueil</h2>
              <ul>
                {recipes.map((recipe) => (
                  <li key={recipe.id}><a href={`#${recipe.slug}`}>{recipe.title}</a></li>
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
            {/* Affiche un message de chargement si les données sont en cours de récupération */}
            {loading && <p>Chargement...</p>}
            {/* Affiche les recettes une fois les données récupérées */}
            {!loading && recipes.map((recipe) => (
              <div key={recipe.id} className={`recipe-card ${isNavOpen ? 'nav-active' : ''}`}>
                <img className="recipe-image" src={recipe.thumbnail} alt={recipe.title} />
                <h3 className="recipe-title">{recipe.title}</h3>
                <p className="recipe-difficulty">Difficulté: {recipe.difficulty}</p>
                <button className="recipe-button">Voir la recette</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App