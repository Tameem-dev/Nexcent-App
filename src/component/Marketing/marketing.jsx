import styles from './marketing.module.css';

import blogImg1 from '../../assets/images/image 18.png';
import blogImg2 from '../../assets/images/image 19.png';
import blogImg3 from '../../assets/images/image 20.png';

const Marketing = () => {
  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Caring is the new marketing
          </h2>
          <p className={styles.sectionDescription}>
            The Nexcent blog is the best place to read about the latest membership insights, 
            trends and more. See who's joining the community, read about how our community 
            are increasing their membership income and lot's more.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className={styles.cardsGrid}>
          {/* Card 1 */}
          <div className={styles.blogCard}>
            <div className={styles.cardImage}>
              <img src={blogImg1} alt="Creating Streamlined Safeguarding Processes" />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                Creating Streamlined Safeguarding Processes with OneRen
              </h3>
              <a href="#" className={styles.readMore}>
                Readmore 
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className={styles.blogCard}>
            <div className={styles.cardImage}>
              <img src={blogImg2} alt="What are your safeguarding responsibilities" />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                What are your safeguarding responsibilities and how can you manage them?
              </h3>
              <a href="#" className={styles.readMore}>
                Readmore 
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className={styles.blogCard}>
            <div className={styles.cardImage}>
              <img src={blogImg3} alt="Revamping the Membership Model" />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                Revamping the Membership Model with Triathlon Australia
              </h3>
              <a href="#" className={styles.readMore}>
                Readmore 
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketing;