import { useState, useEffect } from 'react';
import styles from './insight.module.css';

import insightImage1 from '../../assets/images/Illustration.png';
import insightImage2 from '../../assets/images/Illustration.png';
import insightImage3 from '../../assets/images/Illustration.png';

const slides = [
  {
    id: 1,
    image: insightImage1,
    title: <>Lessons and insights <span className={styles.highlight}>from 8 years</span></>,
    desc: 'Where to grow your business as a photographer: site or social media',
  },
  {
    id: 2,
    image: insightImage2,
    title: <>Scale your business <span className={styles.highlight}>with confidence</span></>,
    desc: 'Discover the strategies that helped thousands of businesses grow online.',
  },
  {
    id: 3,
    image: insightImage3,
    title: <>Build your brand <span className={styles.highlight}>from scratch</span></>,
    desc: 'Step-by-step guides to establish your online presence and reach your audience.',
  },
];

const AUTOPLAY_INTERVAL = 3000; // 3 seconds

const Insight = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const goTo = (indexOrUpdater) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(indexOrUpdater);
    setTimeout(() => setAnimating(false), 400);
  };

  const handleDot = (i) => goTo(i);

  const slide = slides[current];

  return (
    <section className={styles['insight-section']}>
      <div className={`container ${styles['insight-container']}`}>

        {/* Left */}
        <div className={styles['left-insight']}>
          <h2 key={`title-${current}`} className={styles['insight-title']}>
            {slide.title}
          </h2>
          <p key={`desc-${current}`} className={styles['insight-desc']}>
            {slide.desc}
          </p>
          <button className={styles['btn-read-more']}>Register</button>
        </div>

        {/* Right */}
        <div className={styles['right']}>
          <img
            key={`img-${current}`}
            src={slide.image}
            alt="Insight Illustration"
            className={styles['insight-image']}
          />
        </div>

      </div>

      {/* Dots — always centered at the bottom of section */}
      <div className={styles['dots-wrapper']}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles['dot-active'] : ''}`}
            onClick={() => handleDot(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default Insight;