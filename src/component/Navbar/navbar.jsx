import styles from './navbar.module.css';
import logo from '../../assets/images/Icon.png';
import { navBarData } from '../data.js';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <nav className={`${styles.nexcentNav} container`}>
        <div className={styles.navContainer}>

          <div className={styles.brand}>
            <img src={logo} alt="Nexcent Logo" className={styles['logo-image']} />
            <span className={styles['logo-text']}>Nexcent</span>
          </div>

          <ul className={styles['nav-links']}>
            {navBarData.map((item) => (
              <li key={item.id}>
                <NavLink 
                  to={item.pathUrl} 
                  className={({ isActive }) => 
                    isActive ? `${styles['nav-link']} ${styles.active}` : styles['nav-link']
                  }
                >
                  {item.pathName}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles['auth-buttons']}>
            <NavLink to="/login" className={styles['btn-login']}>
              Login
            </NavLink>
            <NavLink to="/signup" className={styles['btn-signup']}>
              Sign up
            </NavLink>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;