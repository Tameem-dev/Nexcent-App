import styles from './client.module.css';

import logo1 from '../../assets/images/Logo.svg';
import logo2 from '../../assets/images/Logo (1).svg';
import logo3 from '../../assets/images/Logo (2).svg';
import logo4 from '../../assets/images/Logo (3).svg';
import logo5 from '../../assets/images/Logo (4).svg';
import logo6 from '../../assets/images/Logo (5).svg';
import logo7 from '../../assets/images/Logo (2).svg';

const clients = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const Clients = () => {
  return (
    <section className={`${styles['clients-section']} ${styles['container']}`}>
      <h2 className={styles['clients-title']}>Our Clients</h2>
      <p className={styles['clients-subtitle']}>
        We have been working with some Fortune 500+ clients
      </p>
      <div className={styles['clients-logos']}>
        {clients.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Client ${index + 1}`}
            className={styles['client-logo']}
          />
        ))}
      </div>
    </section>
  );
};

export default Clients;