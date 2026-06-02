import styles from './insight.module.css';
import insightImage from '../../assets/images/Illustration.png';
import dot from '../../assets/images/Dot.png';

const Insight = () => {
  return (
    <section className={styles['insight-section']}>
      <div className={`container ${styles['insight-container']}`}>
        <div className={styles['left-insight']}>
          <h2 className={styles['insight-title']}>
            Lessons and insights{' '}
            <span className={styles['highlight']}>from 8 years</span>
          </h2>
          <p className={styles['insight-desc']}>
            Where to grow your business as a photographer: site or social media
          </p>
          <button className={styles['btn-read-more']}>Register</button>
        </div>

        <div className={styles['right']}>
          <img src={insightImage} alt="Insight Illustration" className={styles['insight-image']} />
        </div>

        <img src={dot} alt="Dot" className={styles['dot-image']} />
      </div>
    </section>
  )
}

export default Insight;