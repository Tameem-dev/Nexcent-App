import React, { useState } from 'react';
import styles from './testimonial.module.css';

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      location: "California, USA",
      rating: 5,
      image: "👩",
      testimonial: "I had an amazing experience with Nexcent. They helped me find my dream home within my budget. The team was professional, responsive, and truly cared about my needs. I couldn't be happier with my new home!",
      date: "January 2024"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Real Estate Investor",
      location: "Toronto, Canada",
      rating: 5,
      image: "👨",
      testimonial: "As an investor, I've worked with many real estate companies, but Nexcent stands out. Their market insights and property recommendations have helped me build a profitable portfolio. Highly recommended!",
      date: "February 2024"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "First-Time Buyer",
      location: "Miami, USA",
      rating: 4,
      image: "👩",
      testimonial: "Buying my first home was daunting, but Nexcent made it so easy. They guided me through every step, explained everything clearly, and made sure I got the best deal possible. Thank you!",
      date: "March 2024"
    },
    {
      id: 4,
      name: "David Williams",
      role: "Property Seller",
      location: "London, UK",
      rating: 5,
      image: "👨",
      testimonial: "Nexcent sold my property in just 2 weeks! Their marketing strategy was exceptional, and they got me above my asking price. The entire process was smooth and stress-free.",
      date: "April 2024"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Commercial Client",
      location: "Sydney, Australia",
      rating: 4,
      image: "👩",
      testimonial: "I needed a commercial space for my business, and Nexcent delivered. They understood my requirements perfectly and found the ideal location. Professional, efficient, and reliable.",
      date: "May 2024"
    },
    {
      id: 6,
      name: "James Anderson",
      role: "Luxury Buyer",
      location: "Dubai, UAE",
      rating: 5,
      image: "👨",
      testimonial: "The luxury property I purchased through Nexcent exceeded my expectations. Their attention to detail, personalized service, and negotiation skills are unmatched. Would definitely use them again.",
      date: "June 2024"
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => 
      prev === 0 ? Math.ceil(testimonials.length / 3) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => 
      prev === Math.ceil(testimonials.length / 3) - 1 ? 0 : prev + 1
    );
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className={styles.testimonialPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>What Our Clients Say</h1>
          <p className={styles.heroDescription}>
            Hear from our satisfied clients about their experience working with Nexcent.
            We take pride in delivering exceptional service and results.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>98%</h3>
              <p className={styles.statLabel}>Client Satisfaction</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>500+</h3>
              <p className={styles.statLabel}>Happy Clients</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>4.9</h3>
              <p className={styles.statLabel}>Average Rating</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>100+</h3>
              <p className={styles.statLabel}>5-Star Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((item) => (
              <div key={item.id} className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <div className={styles.clientInfo}>
                    <span className={styles.clientImage}>{item.image}</span>
                    <div>
                      <h3 className={styles.clientName}>{item.name}</h3>
                      <p className={styles.clientRole}>{item.role}</p>
                      <p className={styles.clientLocation}>{item.location}</p>
                    </div>
                  </div>
                  <div className={styles.rating}>
                    <span className={styles.stars}>{renderStars(item.rating)}</span>
                    <span className={styles.ratingNumber}>{item.rating}.0</span>
                  </div>
                </div>
                <p className={styles.testimonialText}>"{item.testimonial}"</p>
                <p className={styles.testimonialDate}>{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.featuredContent}>
            <div className={styles.featuredQuote}>
              <span className={styles.quoteIcon}>❝</span>
              <p className={styles.quoteText}>
                "Nexcent transformed our property search experience. Their innovative platform 
                and dedicated team made finding our perfect home effortless. We're grateful for 
                their expertise and professionalism throughout the entire process."
              </p>
              <div className={styles.quoteAuthor}>
                <span className={styles.authorImage}>👩</span>
                <div>
                  <h4 className={styles.authorName}>Jennifer Martinez</h4>
                  <p className={styles.authorInfo}>Homeowner, New York</p>
                </div>
              </div>
            </div>
            <div className={styles.featuredStats}>
              <div className={styles.featuredStat}>
                <h4>100%</h4>
                <p>Client Satisfaction Rate</p>
              </div>
              <div className={styles.featuredStat}>
                <h4>4.9/5</h4>
                <p>Average Rating</p>
              </div>
              <div className={styles.featuredStat}>
                <h4>500+</h4>
                <p>Successful Transactions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Be Our Next Happy Client?</h2>
          <p className={styles.ctaDescription}>
            Join hundreds of satisfied clients who found their dream properties with Nexcent.
          </p>
          <button className={styles.ctaButton}>Get Started Today</button>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;