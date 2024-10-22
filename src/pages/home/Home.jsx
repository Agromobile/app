import { useState } from 'react';
import LandingPage from './LandingPage';
import HomePage from '../HomePage/HomePage';

export default function Home() {
  const [isAuthenticated] = useState(true);

  return isAuthenticated ? <HomePage /> : <LandingPage />;
}
