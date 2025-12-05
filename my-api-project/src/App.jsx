import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// Componentes de Layout
import Navbar from './components/navbar';
import Footer from './components/footer';

// Componentes de Página
import HomePage from './pages/HomePage';
import TopAnimePage from './pages/TopAnimePage';
import AnimeDetailsPage from './pages/AnimeDetailsPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/top-animes" element={<TopAnimePage />} />
              <Route path="/anime/:id" element={<AnimeDetailsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;