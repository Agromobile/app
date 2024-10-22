import { useState } from 'react';
import { NavbarMain, Navbar } from '.';

export default function NavbarAuth() {
  const [isAuthenticated] = useState(true);

  return isAuthenticated ? <NavbarMain /> : <Navbar />;
}
