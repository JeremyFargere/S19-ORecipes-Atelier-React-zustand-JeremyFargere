import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<div>Bienvenue sur la page d'accueil</div>} />
  <Route path="/react" element={<div>Bienvenue sur la page React</div>} />
  <Route path="/post/:slug" element={<SinglePostPage />} />
  <Route path="*" element={<div>404</div>} />
</Routes>