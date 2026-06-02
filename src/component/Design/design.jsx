import styles from './design.module.css';
import designImg from '../../assets/images/pana.png';

const Design = () => {
  return (
    <section className={styles.designSection}>
      <div className={styles.container}>
        <div className={styles.designWrapper}>
          {/* Left Side - Image */}
          <div className={styles.designImage}>
            <img 
              src={designImg} 
              alt="Design Illustration" 
            />
          </div>

          {/* Right Side - Content */}
          <div className={styles.designContent}>
            <h2 className={styles.designTitle}>
              How to design your site <br />
              footer like we did
            </h2>
            <p className={styles.designDescription}>
              Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, 
              augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque 
              elit erat a magna. Donec quis erat at libero ultrices mollis. In 
              hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta 
              nisi facilisis finibus. In euismod augue vitae nisi ultricies, non 
              aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus 
              efficitur quis massa. Praesent felis est, finibus et nisi ac, 
              hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida.
            </p>
            <button className={styles.learnMoreBtn}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Design;