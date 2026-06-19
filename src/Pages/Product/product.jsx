import React from 'react';
import styles from './product.module.css';

const Product = () => {
  const products = [
    {
      id: 1,
      title: "Residential Properties",
      description: "Find your dream home with our extensive selection of residential properties.",
      icon: "🏠",
      features: ["Single-family homes", "Apartments", "Condos", "Townhouses"],
      price: "From $100K"
    },
    {
      id: 2,
      title: "Commercial Properties",
      description: "Discover prime commercial spaces for your business or investment.",
      icon: "🏢",
      features: ["Office spaces", "Retail stores", "Warehouses", "Industrial units"],
      price: "From $250K"
    },
    {
      id: 3,
      title: "Luxury Estates",
      description: "Experience unparalleled luxury with our premium property collection.",
      icon: "🏰",
      features: ["Beachfront villas", "Mountain estates", "Penthouses", "Private mansions"],
      price: "From $1M"
    },
    {
      id: 4,
      title: "Investment Properties",
      description: "High-yield investment opportunities with excellent ROI potential.",
      icon: "💼",
      features: ["Multi-family units", "Mixed-use buildings", "Land parcels", "Flipping properties"],
      price: "From $150K"
    }
  ];

  const categories = [
    { id: 1, name: "All Properties", count: 1200 },
    { id: 2, name: "Residential", count: 500 },
    { id: 3, name: "Commercial", count: 300 },
    { id: 4, name: "Luxury", count: 150 },
    { id: 5, name: "Investment", count: 250 }
  ];

  return (
    <div className={styles.productPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Our Products</h1>
          <p className={styles.heroDescription}>
            Discover our comprehensive range of real estate products designed to meet 
            your unique needs and preferences.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.categoriesList}>
            {categories.map((category) => (
              <button key={category.id} className={styles.categoryBtn}>
                {category.name}
                <span className={styles.categoryCount}>{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className={styles.productsSection}>
        <div className={styles.container}>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <span className={styles.productIcon}>{product.icon}</span>
                  <span className={styles.productPrice}>{product.price}</span>
                </div>
                <div className={styles.productContent}>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <div className={styles.productFeatures}>
                    {product.features.map((feature, index) => (
                      <span key={index} className={styles.featureTag}>
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button className={styles.viewDetailsBtn}>View Details →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.featuredContent}>
            <div className={styles.featuredText}>
              <h2 className={styles.featuredTitle}>Featured Product</h2>
              <h3 className={styles.featuredProductTitle}>Luxury Beachfront Villa</h3>
              <p className={styles.featuredDescription}>
                Experience the ultimate luxury in this stunning beachfront villa with 
                panoramic ocean views, private pool, and world-class amenities.
              </p>
              <ul className={styles.featuredFeatures}>
                <li>✓ 5 Bedrooms</li>
                <li>✓ 6 Bathrooms</li>
                <li>✓ Private Pool</li>
                <li>✓ Ocean View</li>
              </ul>
              <div className={styles.featuredPrice}>$2,500,000</div>
              <button className={styles.featuredBtn}>Inquire Now</button>
            </div>
            <div className={styles.featuredImage}>
              <span className={styles.featuredIcon}>🏖️</span>
              <div className={styles.featuredBadge}>Featured</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Find Your Perfect Property</h2>
          <p className={styles.ctaDescription}>
            Browse our complete catalog and discover the property that matches your vision.
          </p>
          <button className={styles.ctaButton}>Browse All Products</button>
        </div>
      </section>
    </div>
  );
};

export default Product;