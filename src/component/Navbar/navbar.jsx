import styles from './navbar.module.css';
import logo from '../../assets/images/Icon.png';
import { navBarData } from '../data.js';

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
              <a href={item.pathUrl} className={`${styles['nav-link']}`}>
                {item.pathName}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles['auth-buttons']}>
          <button className={styles['btn-login']}>Login</button>
          <button className={styles['btn-signup']}>Sign up</button>
        </div>

      </div>
    </nav>

    </header>
      );
};

export default Navbar;
