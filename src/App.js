import { Routes, Route, useLocation } from 'react-router-dom';
import { Home, SignUp } from './pages';
import Layout from './layout';

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <>
      {/* Enables previous page to display simultaneously with modal page */}
      <Routes location={previousLocation || location}>
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
      {/* Enables modal pages to be displayed as an overlay */}
      {previousLocation && (
        <Routes>
          <Route
            path="signup"
            element={<SignUp />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
