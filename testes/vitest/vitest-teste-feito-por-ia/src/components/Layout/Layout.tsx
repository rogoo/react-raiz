import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <span className="layout__brand">Vitest Test</span>
        <nav className="layout__nav">
          <NavLink to="/" end className="layout__link">
            Home
          </NavLink>
          <NavLink to="/users" className="layout__link">
            Users
          </NavLink>
          <NavLink to="/email" className="layout__link">
            Fale Conosco
          </NavLink>
        </nav>
        <div className="layout__actions">
          <ThemeToggle />
        </div>
      </header>

      <main className="layout__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
