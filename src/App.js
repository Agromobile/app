import { Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import Layout from './layout';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<Home />}
          />

          {/* Matches all undefined routes */}
          <Route
            path="*"
            element={<h1>404: Page Not Found</h1>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
