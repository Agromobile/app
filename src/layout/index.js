import { Outlet } from 'react-router-dom';
import { NavbarAuth, Footer } from '../components';

export default function Layout() {
  return (
    <>
      <NavbarAuth />
      <Outlet />
      <Footer />
    </>
  );
}
