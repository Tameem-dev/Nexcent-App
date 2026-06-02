// Community.js
import { communityData } from '../data.js';
import styles from './community.module.css';
import img1 from '../../assets/images/Icon (1).png';
import img2 from '../../assets/images/Icon (2).png';
import img3 from '../../assets/images/Icon (3).png';
import CommuChild from  "../Community-child/commuchild.jsx"

// Map the imported images to an object for easy access
const iconMap = {
  "Icon (1).png": img1,
  "Icon (2).png": img2,
  "Icon (3).png": img3,
};

const Community = () => {
  return (
    <section className={styles['community-section']}>
      <div className={styles['container']}>
        <div className={styles['section-header']}>
          <h2 className={styles['section-title']}>
            Manage your entire community <br />
            in a single system
          </h2>
          <p className={styles['section-subtitle']}>Who is Nextcent suitable for?</p>
        </div>

        <div className={styles['cards-grid']}>
          {communityData.map((item) => (
            <CommuChild
              key={item.id}
              icon={iconMap[item.icon]}
              title={item.title}
              description={item.description}
              alt={item.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;

