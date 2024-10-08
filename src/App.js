import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { Home } from './pages';

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<h1>About Us</h1>}
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
