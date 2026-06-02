import  styles from './unseen.module.css';
import image from '../../assets/images/Frame 35.png';

const unseen = () => {
  return (
    <section className={`${styles['pixelgrade-section'] } ${styles['container']}`}>
      <div className={styles.container}>
        <div className={styles['pixelgrade-wrapper']}>

          <div className={styles['pixelgrade-image']}>
            <img 
              src={image} 
              alt="Pixelgrade Illustration" 
            />
          </div>

          <div className={styles['pixelgrade-content']}>
            <h2 className={styles['pixelgrade-title']}>
              The unseen of spending three <br />
              years at Pixelgrade
            </h2>
            <p className={styles['pixelgrade-description']}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed sit amet justo ipsum. Sed accumsan quam vitae est varius 
              fringilla. Pellentesque placerat vestibulum lorem sed porta. 
              Nullam mattis tristique iaculis. Nullam pulvinar sit amet 
              risus pretium auctor. Etiam quis massa pulvinar, aliquam 
              quam vitae, tempus sem. Donec elementum pulvinar odio.
            </p>
            <button className={styles['btn-learn-more']}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default unseen;