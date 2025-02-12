import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  // Ferme la navbar après 10 s d'ouverture
  useEffect(() => {
    if (isNavOpen) {
      const timer = setTimeout(() => setIsNavOpen(false), 50000)
      return () => clearTimeout(timer)
    }
  }, [isNavOpen])

  // Bascule l'état ouvert/fermé au clic
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <>
      <div className="body">
        {/* Affiche la navbar seulement quand isNavOpen est true */}
        {isNavOpen && (
          <div className="navbar">
            <nav onClick={toggleNav}>
              <h2>Accueil</h2>
              <ul>
                <li><a href="#cookies">Cookies au beurre de cacahuète</a></li>
                <li><a href="#macaron">Macaron framboisier</a></li>
                <li><a href="#tarte-citron">Tarte au citron meringuée</a></li>
                <li><a href="#amandier">Amandier</a></li>
                <li><a href="#fondant-chocolat">Fondant au chocolat sans gluten</a></li>
                <li><a href="#tarte-banoffe">Tarte banoffe</a></li>
              </ul>
            </nav>
          </div>
        )}
        <div className={`header ${isNavOpen ? 'header-shrunk' : 'header-full'}`}>
          <div className="header-content">
            <img
              className="logo"
              src="../public/img/logo.png"
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
          <div className="recipe-card">
          <img className="recipe-image" src="https://via.placeholder.com/150" alt="Recette" />
          <h3 className="recipe-title">Titre de la recette</h3>
          <p className="recipe-difficulty">Difficulté: Facile</p>
          <button className="recipe-button">Voir la recette</button>
        </div>
        </div>
      </div>
    </>
  )
}

export default App;