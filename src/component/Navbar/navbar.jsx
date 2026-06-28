import { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import logo from '../../assets/images/Icon.png';
import { navBarData } from '../data.js';
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <nav className={`${styles.nexcentNav} container`}>
        <div className={styles.navContainer}>

          {/* Brand */}
          <div className={styles.brand}>
            <img src={logo} alt="Nexcent Logo" className={styles.logoImage} />
            <span className={styles.logoText}>Nexcent</span>
          </div>

          {/* Desktop nav links */}
          <ul className={styles.navLinks}>
            {navBarData.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.pathUrl}
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                  }
                >
                  {item.pathName}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop auth buttons */}
          <div className={styles.authButtons}>
            <NavLink to="/login" className={styles.btnLogin}>Login</NavLink>
            <NavLink to="/signup" className={styles.btnSignup}>Sign up</NavLink>
          </div>

          {/* Hamburger — mobile only (opens drawer) */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <HiMenu size={24} />
          </button>

        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ''}`}
        onClick={closeMenu}
      />

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>

        {/* Close button inside drawer */}
        <button className={styles.drawerClose} onClick={closeMenu} aria-label="Close menu">
          <HiX size={24} />
        </button>

        <ul className={styles.drawerLinks}>
          {navBarData.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.pathUrl}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? `${styles.drawerLink} ${styles.drawerLinkActive}` : styles.drawerLink
                }
              >
                {item.pathName}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.drawerAuth}>
          <NavLink to="/login" className={styles.btnLogin} onClick={closeMenu}>Login</NavLink>
          <NavLink to="/signup" className={styles.btnSignup} onClick={closeMenu}>Sign up</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;