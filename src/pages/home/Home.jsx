import { useState } from 'react';
import LandingPage from './LandingPage';

export default function Home() {
  const [isAuthenticated] = useState(false);

  return isAuthenticated ? (
    <h1>Auth Homepage.jsx content should go here</h1>
  ) : (
    <LandingPage />
  );
}
