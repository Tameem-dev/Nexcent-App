import React, { useState } from 'react';
import styles from './faq.module.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I start searching for properties?",
      answer: "To start searching for properties, simply visit our homepage and use the search bar. You can filter by location, property type, price range, and other criteria. Our advanced search algorithms will help you find the perfect property that matches your requirements."
    },
    {
      id: 2,
      question: "What types of properties do you offer?",
      answer: "We offer a wide range of properties including residential homes, apartments, condos, townhouses, commercial spaces, warehouses, luxury estates, and investment properties. We have options to suit every need and budget."
    },
    {
      id: 3,
      question: "How do I schedule a property viewing?",
      answer: "To schedule a property viewing, simply click on the property you're interested in and select 'Schedule a Viewing'. Choose your preferred date and time, and our team will confirm the appointment. Virtual tours are also available for many properties."
    },
    {
      id: 4,
      question: "What financing options are available?",
      answer: "We work with multiple financial institutions to offer you the best mortgage and financing options. You can use our mortgage calculator to estimate your payments, and our team will guide you through the entire financing process."
    },
    {
      id: 5,
      question: "How long does the buying process take?",
      answer: "The buying process typically takes 30-45 days from offer acceptance to closing. However, this can vary depending on factors like financing approval, inspection results, and legal procedures. Our team will keep you informed at every step."
    },
    {
      id: 6,
      question: "Do you offer property management services?",
      answer: "Yes, we offer comprehensive property management services including tenant screening, rent collection, maintenance, and property maintenance. Our team can handle all aspects of managing your investment properties."
    },
    {
      id: 7,
      question: "Are virtual tours available?",
      answer: "Yes, we offer immersive 360° virtual tours for many of our properties. This allows you to view properties from anywhere at any time. You can explore every room and get a real feel for the property before scheduling an in-person visit."
    },
    {
      id: 8,
      question: "What are your commission rates?",
      answer: "Our commission rates are competitive and transparent. Typically, the seller pays the commission, which averages 5-6% of the sale price. This is split between the buyer's and seller's agents. We'll discuss all fees upfront before we begin."
    },
    {
      id: 9,
      question: "Can I sell my property with Nexcent?",
      answer: "Absolutely! We provide full-service selling support including professional photography, listing creation, marketing, showings, and negotiation. Our team will help you get the best possible price for your property with minimal stress."
    },
    {
      id: 10,
      question: "What makes Nexcent different from other real estate platforms?",
      answer: "Nexcent combines cutting-edge technology with personalized service. We offer advanced search tools, market analytics, virtual tours, and a team of experienced professionals dedicated to your success. Our innovative approach makes finding or selling properties easier and more enjoyable."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
          <p className={styles.heroDescription}>
            Find answers to the most common questions about buying, selling, and 
            investing in properties with Nexcent.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className={styles.quickLinksSection}>
        <div className={styles.container}>
          <div className={styles.quickLinks}>
            <button className={styles.quickLinkBtn}>Buying</button>
            <button className={styles.quickLinkBtn}>Selling</button>
            <button className={styles.quickLinkBtn}>Investing</button>
            <button className={styles.quickLinkBtn}>Financing</button>
            <button className={styles.quickLinkBtn}>Property Management</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqGrid}>
            {faqs.map((faq, index) => (
              <div 
                key={faq.id} 
                className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
              >
                <div 
                  className={styles.faqQuestion} 
                  onClick={() => toggleFAQ(index)}
                >
                  <h3>{faq.question}</h3>
                  <span className={styles.faqIcon}>
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactContent}>
            <h2 className={styles.contactTitle}>Still Have Questions?</h2>
            <p className={styles.contactDescription}>
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <div className={styles.contactOptions}>
              <div className={styles.contactOption}>
                <span className={styles.contactIcon}>📞</span>
                <h4>Call Us</h4>
                <p>+1 (555) 123-4567</p>
                <span className={styles.contactHours}>Mon-Fri 9AM-6PM</span>
              </div>
              <div className={styles.contactOption}>
                <span className={styles.contactIcon}>✉️</span>
                <h4>Email Us</h4>
                <p>support@nexcent.com</p>
                <span className={styles.contactHours}>24/7 Support</span>
              </div>
              <div className={styles.contactOption}>
                <span className={styles.contactIcon}>💬</span>
                <h4>Live Chat</h4>
                <p>Chat with our team</p>
                <span className={styles.contactHours}>Available Now</span>
              </div>
            </div>
            <button className={styles.contactBtn}>Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;