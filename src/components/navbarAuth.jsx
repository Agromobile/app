import { useAuth } from '../context/auth-context';
import { NavbarMain, Navbar } from '.';

export default function NavbarAuth() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <NavbarMain /> : <Navbar />;
}
