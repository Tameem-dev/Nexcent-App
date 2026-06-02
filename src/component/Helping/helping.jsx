import styles from './helping.module.css';

import membersImg from "../../assets/images/Icon (14).png";
import clubsImg from '../../assets/images/Icon (11).png';
import eventsImg from '../../assets/images/Icon (12).png';
import paymentsImg from '../../assets/images/Icon (13).png';

const helping = () => {
  return (
    <section  className={styles.businessSection}>
      <div className={styles.container}>
        <div className={styles.businessWrapper}>
        
          <div className={styles.businessText}>
            <h2 className={styles.businessTitle}>
              Helping a local <br />
              business reinvent itself
            </h2>
            <p className={styles.businessSubtitle}>
              We reached here with our hard work and dedication
            </p>
          </div>

          <div className={styles.businessStats}>
            <div className={styles.statsGrid}>
              {/* Stat 1 - Members */}
              <div className={styles.statItem}>
                <div className={styles.statImage}>
                  <img src={membersImg} alt="Members" />
                </div>
                <div className={styles.statInfo}>
                  <h3 className={styles.statNumber}>2,245,341</h3>
                  <p className={styles.statLabel}>Members</p>
                </div>
              </div>

     
              <div className={styles.statItem}>
                <div className={styles.statImage}>
                  <img src={clubsImg} alt="Clubs" />
                </div>
                <div className={styles.statInfo}>
                  <h3 className={styles.statNumber}>46,328</h3>
                  <p className={styles.statLabel}>Clubs</p>
                </div>
              </div>

              
              <div className={styles.statItem}>
                <div className={styles.statImage}>
                  <img src={eventsImg} alt="Event Bookings" />
                </div>
                <div className={styles.statInfo}>
                  <h3 className={styles.statNumber}>828,867</h3>
                  <p className={styles.statLabel}>Event Bookings</p>
                </div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statImage}>
                  <img src={paymentsImg} alt="Payments" />
                </div>
                <div className={styles.statInfo}>
                  <h3 className={styles.statNumber}>1,926,436</h3>
                  <p className={styles.statLabel}>Payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default helping;