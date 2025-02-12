import "./Navbar.css"

function Navbar({ isOpen, toggleNav }) {
  return (
    <div className={`navbar ${isOpen ? "open" : ""}`}>
      <nav>
        <h2 onClick={toggleNav} style={{ cursor: "pointer" }}>Accueil</h2>
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
  )
}

export default Navbar
