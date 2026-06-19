import React from 'react';
import styles from './service.module.css';

const Service = () => {
  const services = [
    {
      id: 1,
      title: "Property Management",
      description: "Full-service property management solutions for residential and commercial properties.",
      icon: "🏢",
      features: ["Tenant screening", "Maintenance", "Rent collection"]
    },
    {
      id: 2,
      title: "Real Estate Consulting",
      description: "Expert advice for buyers, sellers, and investors to make informed decisions.",
      icon: "📊",
      features: ["Market analysis", "Investment strategy", "Property valuation"]
    },
    {
      id: 3,
      title: "Buying & Selling",
      description: "End-to-end support for buying or selling properties with ease.",
      icon: "🏠",
      features: ["Listing services", "Negotiation", "Closing support"]
    },
    {
      id: 4,
      title: "Property Investment",
      description: "Strategic investment opportunities in prime real estate locations.",
      icon: "💰",
      features: ["Portfolio management", "ROI analysis", "Risk assessment"]
    },
    {
      id: 5,
      title: "Relocation Services",
      description: "Comprehensive relocation assistance for individuals and families.",
      icon: "🚚",
      features: ["Moving support", "Area guides", "School information"]
    },
    {
      id: 6,
      title: "Legal Services",
      description: "Expert legal guidance for all real estate transactions.",
      icon: "⚖️",
      features: ["Contract review", "Title search", "Legal compliance"]
    }
  ];

  return (
    <div className={styles.servicePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Our Services</h1>
          <p className={styles.heroDescription}>
            We provide comprehensive real estate services to meet all your needs.
            From property management to investment advice, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <span className={styles.checkmark}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={styles.learnMoreBtn}>Learn More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyChooseSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose Our Services</h2>
          <div className={styles.whyChooseGrid}>
            <div className={styles.whyChooseCard}>
              <div className={styles.whyIcon}>⭐</div>
              <h3>Expert Team</h3>
              <p>Our team consists of experienced professionals with deep industry knowledge.</p>
            </div>
            <div className={styles.whyChooseCard}>
              <div className={styles.whyIcon}>🤝</div>
              <h3>Customer Focused</h3>
              <p>We prioritize our clients' needs and work tirelessly to exceed expectations.</p>
            </div>
            <div className={styles.whyChooseCard}>
              <div className={styles.whyIcon}>🏆</div>
              <h3>Proven Results</h3>
              <p>We have a track record of successful transactions and satisfied clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaDescription}>
            Contact us today to discuss your real estate needs and discover how we can help.
          </p>
          <button className={styles.ctaButton}>Contact Us Now</button>
        </div>
      </section>
    </div>
  );
};

export default Service;