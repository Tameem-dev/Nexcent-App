import React from 'react';
import styles from './feature.module.css';

const Feature = () => {
  const features = [
    {
      id: 1,
      title: "Smart Search",
      description: "Advanced search algorithms to find the perfect property that matches your criteria.",
      icon: "🔍",
      status: "Available"
    },
    {
      id: 2,
      title: "Virtual Tours",
      description: "Experience properties from anywhere with immersive 360° virtual tours.",
      icon: "🎥",
      status: "Available"
    },
    {
      id: 3,
      title: "Price Alerts",
      description: "Get instant notifications when property prices change or new listings appear.",
      icon: "🔔",
      status: "Available"
    },
    {
      id: 4,
      title: "Market Analytics",
      description: "Access detailed market trends, property valuations, and investment insights.",
      icon: "📈",
      status: "Available"
    },
    {
      id: 5,
      title: "Mortgage Calculator",
      description: "Calculate monthly payments, interest rates, and affordability instantly.",
      icon: "💰",
      status: "Available"
    },
    {
      id: 6,
      title: "Document Management",
      description: "Securely store and manage all your property documents in one place.",
      icon: "📄",
      status: "Coming Soon"
    }
  ];

  return (
    <div className={styles.featurePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Powerful Features</h1>
          <p className={styles.heroDescription}>
            Discover the tools and features that make finding your dream property 
            easier, faster, and more enjoyable.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <div key={feature.id} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                  <span className={`${styles.featureStatus} ${feature.status === 'Available' ? styles.available : styles.comingSoon}`}>
                    {feature.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>50K+</h3>
              <p className={styles.statLabel}>Properties Listed</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>10K+</h3>
              <p className={styles.statLabel}>Happy Clients</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>98%</h3>
              <p className={styles.statLabel}>Satisfaction Rate</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>24/7</h3>
              <p className={styles.statLabel}>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Explore?</h2>
          <p className={styles.ctaDescription}>
            Start using our powerful features today and find your dream property.
          </p>
          <button className={styles.ctaButton}>Get Started Now</button>
        </div>
      </section>
    </div>
  );
};

export default Feature;