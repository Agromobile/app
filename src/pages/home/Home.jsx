// import { useState } from 'react';
import { useAuth } from '../../context/auth-context';
import LandingPage from './LandingPage';
import HomePage from '../HomePage/HomePage';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <HomePage /> : <LandingPage />;
}
