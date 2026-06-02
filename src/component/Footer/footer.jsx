import styles from './footer.module.css';

import logoImg from '../../assets/images/Icon@3x.png';
import sendIcon from '../../assets/images/send.png';
import facebookIcon from '../../assets/images/internet.png';
import twitterIcon from '../../assets/images/twitter.png';
import instagramIcon from '../../assets/images/instag.png';
import youtubeIcon from '../../assets/images/yotube.png';

const Footer = () => {
  return (
    <footer>
    
      <div className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>
            Pellentesque suscipit <br />
            fringilla libero eu.
          </h2>
          <button className={styles.demoBtn}>
            Get a Demo →
          </button>
        </div>
      </div>

      
      <div className={styles.footerBottomSection}>
        <div className={styles.container}>
          {/* Footer Columns Section */}
          <div className={styles.footerWrapper}>
            {/* Left Column - Logo & Social */}
            <div className={styles.footerColumn}>
              <div className={styles.logo}>
                <img src={logoImg} alt="Nexcent Logo" className={styles.logoImage} />
                <span className={styles.logoText}>Nexcent</span>
              </div>
              <p className={styles.copyright}>
                Copyright © 2020 Nexcent Ltd.<br />
                All rights reserved
              </p>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialLink}>
                  <img src={facebookIcon} alt="Facebook" />
                </a>
                <a href="#" className={styles.socialLink}>
                  <img src={twitterIcon} alt="Twitter" />
                </a>
                <a href="#" className={styles.socialLink}>
                  <img src={instagramIcon} alt="Instagram" />
                </a>
                <a href="#" className={styles.socialLink}>
                  <img src={youtubeIcon} alt="YouTube" />
                </a>
              </div>
            </div>

            
            <div className={styles.footerColumn}>
              <h3 className={styles.footerTitle}>Company</h3>
              <ul className={styles.footerLinks}>
                <li><a href="#">About us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Testimonials</a></li>
              </ul>
            </div>

            
            <div className={styles.footerColumn}>
              <h3 className={styles.footerTitle}>Support</h3>
              <ul className={styles.footerLinks}>
                <li><a href="#">Help center</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">Legal</a></li>
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Status</a></li>
              </ul>
            </div>

        
            <div className={styles.footerColumn}>
              <h3 className={styles.footerTitle}>Stay up to date</h3>
              <div className={styles.newsletterForm}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className={styles.emailInput}
                />
                <button type="submit" className={styles.submitBtn}>
                  <img src={sendIcon} alt="Send" className={styles.sendIcon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
