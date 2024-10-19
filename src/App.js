import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home, SignUp, Login } from './pages';
import Layout from './layout';

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  // Lock screen when modal page displayed. Else, unlock
  useEffect(() => {
    const lockedLocations = ['/signup', '/login'];

    // console.log(location);
    if (lockedLocations.includes(location.pathname)) {
      document.body.classList.add('screen-lock');
    } else {
      document.body.classList.remove('screen-lock');
    }
  }, [location]);

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
          <Route
            path="login"
            element={<Login />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
