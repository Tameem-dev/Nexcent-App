import styles from './testimonial.module.css';

import logo1 from '../../assets/images/Logoss.png';
import logo2 from '../../assets/images/Logo (1).svg';
import logo3 from '../../assets/images/Logo (2).svg';
import logo4 from '../../assets/images/Logo (3).svg';
import logo5 from '../../assets/images/Logo (4).svg';
import logo6 from '../../assets/images/Logo (5).svg';
import avatarImg from '../../assets/images/image 9.png';

const TestimonialSection = () => {
  return (
    <section className={styles.testimonialSection}>
      <div className={styles.container}>
        <div className={styles.testimonialWrapper}>

          <div className={styles.testimonialImage}>
            <img src={avatarImg} alt="Tim Smith" />
          </div>

          
          <div className={styles.testimonialContent}>
            <p className={styles.testimonialText}>
              Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, 
              vel rutrum risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero 
              ornare, tristique quam in, gravida enim. Nullam ut molestie arcu, at hendrerit 
              elit. Morbi laoreet elit at ligula molestie, nec molestie mi blandit. 
              Suspendisse cursus tellus sed augue ultrices, quis tristique nulla sodales. 
              Suspendisse eget lorem eu turpis vestibulum pretium. Suspendisse potenti. 
              Quisque malesuada enim sapien, vitae placerat ante feugiat eget. Quisque 
              vulputate odio neque, eget efficitur libero condimentum id. Curabitur id nibh 
              id sem dignissim finibus ac sit amet magna.
            </p>
            
            <div className={styles.authorSection}>
              <h4 className={styles.authorName}>Tim Smith</h4>
              <p className={styles.authorTitle}>British Dragon Boat Racing Association</p>
            </div>

            <div className={styles.logosSection}>
              <div className={styles.logosGrid}>
                <img src={logo1} alt="Logo 1" />
                <img src={logo2} alt="Logo 2" />
                <img src={logo3} alt="Logo 3" />
                <img src={logo4} alt="Logo 4" />
                <img src={logo5} alt="Logo 5" />
                <img src={logo6} alt="Logo 6" />
              </div>
              <a href="#" className={styles.meetLink}>
                Meet all customers 
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;