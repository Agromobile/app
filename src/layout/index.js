import { Outlet } from 'react-router-dom';
import {
  Navbar,
  // Footer
} from '../components';

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}
