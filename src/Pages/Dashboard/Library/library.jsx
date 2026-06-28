import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './library.module.css';
import TeslaLogo from '../../../assets/images/TESLA.png';
import {
  MdDashboard, MdBarChart, MdLibraryBooks, MdPeople, MdChecklist,
  MdRocketLaunch, MdSettings, MdDownload, MdSearch, MdAdd, MdLogout,
  MdBookmark, MdBookmarkBorder, MdStar, MdStarBorder, MdFolder,
  MdDateRange, MdPerson, MdMenuBook, MdDescription, MdVideoLibrary,
  MdPictureAsPdf, MdLink, MdMoreVert, MdFilterList, MdGridOn, MdViewList,
  MdMenu, MdClose,
} from "react-icons/md";

const navItems = [
  { icon: <MdDashboard size={18} />, label: "Dashboard", path: "/dashboard" },
  { icon: <MdBarChart size={18} />, label: "Reports", path: "/reports" },
  { icon: <MdLibraryBooks size={18} />, label: "Library", path: "/library" },
  { icon: <MdPeople size={18} />, label: "People", path: "/people" },
  { icon: <MdChecklist size={18} />, label: "Activities", path: "/activities" },
];

const supportItems = [
  { icon: <MdRocketLaunch size={18} />, label: "Get Started", path: "/getstarted" },
  { icon: <MdSettings size={18} />, label: "Settings", path: "/settings" },
];

const categories = [
  { id: 1, name: "All", count: 24, icon: <MdLibraryBooks /> },
  { id: 2, name: "Books", count: 8, icon: <MdMenuBook /> },
  { id: 3, name: "Articles", count: 6, icon: <MdDescription /> },
  { id: 4, name: "Videos", count: 4, icon: <MdVideoLibrary /> },
  { id: 5, name: "Documents", count: 3, icon: <MdPictureAsPdf /> },
  { id: 6, name: "Links", count: 3, icon: <MdLink /> },
];

const libraryItems = [
  { id: 1, title: "Real Estate Investment Guide 2024", type: "Book", category: "Books", author: "John Smith", date: "2024-01-15", pages: 245, rating: 4.5, description: "Comprehensive guide to real estate investing in the current market.", icon: <MdMenuBook />, color: "#4CAF4F", tags: ["Investing", "Real Estate", "Finance"], status: "Available" },
  { id: 2, title: "Property Management Best Practices", type: "Document", category: "Documents", author: "Sarah Johnson", date: "2024-02-01", pages: 12, rating: 4.8, description: "Best practices for managing rental properties effectively.", icon: <MdDescription />, color: "#2196f3", tags: ["Management", "Rental", "Property"], status: "Available" },
  { id: 3, title: "Market Trends Analysis 2024", type: "Article", category: "Articles", author: "Michael Chen", date: "2024-03-10", pages: 8, rating: 4.2, description: "Analysis of current real estate market trends and predictions.", icon: <MdDescription />, color: "#ff9800", tags: ["Market", "Analysis", "Trends"], status: "Available" },
  { id: 4, title: "Mortgage Calculator Tutorial", type: "Video", category: "Videos", author: "Emily Davis", date: "2024-03-15", duration: "15:30", rating: 4.9, description: "Step-by-step tutorial on using mortgage calculators.", icon: <MdVideoLibrary />, color: "#e91e63", tags: ["Mortgage", "Tutorial", "Finance"], status: "Available" },
  { id: 5, title: "Legal Aspects of Real Estate", type: "Book", category: "Books", author: "Robert Wilson", date: "2024-02-20", pages: 320, rating: 4.3, description: "Understanding the legal framework of real estate transactions.", icon: <MdMenuBook />, color: "#9c27b0", tags: ["Legal", "Contracts", "Law"], status: "Available" },
  { id: 6, title: "Commercial Property Valuation", type: "Document", category: "Documents", author: "Lisa Thompson", date: "2024-03-01", pages: 18, rating: 4.6, description: "Methods and techniques for commercial property valuation.", icon: <MdDescription />, color: "#00bcd4", tags: ["Commercial", "Valuation", "Investment"], status: "Available" },
  { id: 7, title: "Sustainable Building Practices", type: "Article", category: "Articles", author: "David Green", date: "2024-03-20", pages: 6, rating: 4.0, description: "Sustainable and eco-friendly building practices for modern properties.", icon: <MdDescription />, color: "#8bc34a", tags: ["Sustainability", "Green", "Building"], status: "Available" },
  { id: 8, title: "Real Estate Negotiation Skills", type: "Video", category: "Videos", author: "Amanda Foster", date: "2024-04-01", duration: "22:45", rating: 4.7, description: "Essential negotiation skills for real estate professionals.", icon: <MdVideoLibrary />, color: "#f44336", tags: ["Negotiation", "Skills", "Professional"], status: "Available" },
];

const LibraryCard = ({ item }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(rating)) return <MdStar key={i} className={styles.starFilled} />;
      if (i === Math.floor(rating) && rating % 1 >= 0.5) return <MdStar key={i} className={styles.starHalf} />;
      return <MdStarBorder key={i} className={styles.starEmpty} />;
    });
  };

  return (
    <div className={styles.libraryCard}>
      <div className={styles.cardIcon} style={{ backgroundColor: `${item.color}20`, color: item.color }}>
        {item.icon}
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <div className={styles.cardActions}>
            <button className={styles.bookmarkBtn} onClick={() => setIsBookmarked(!isBookmarked)}>
              {isBookmarked ? <MdBookmark /> : <MdBookmarkBorder />}
            </button>
            <button className={styles.moreBtn}><MdMoreVert /></button>
          </div>
        </div>
        <p className={styles.cardAuthor}><MdPerson size={13} /> {item.author}</p>
        <p className={styles.cardDescription}>{item.description}</p>
        <div className={styles.cardMeta}>
          <span><MdFolder size={13} /> {item.category}</span>
          <span><MdDateRange size={13} /> {item.date}</span>
          {item.pages && <span>{item.pages}p</span>}
          {item.duration && <span>{item.duration}</span>}
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.cardTags}>
            {item.tags.map((tag, i) => <span key={i} className={styles.tag}>{tag}</span>)}
          </div>
          <div className={styles.cardRating}>
            {renderStars(item.rating)}
            <span className={styles.ratingText}>{item.rating}</span>
          </div>
        </div>
        <div className={styles.cardStatus}>
          <span className={styles.statusBadge}>{item.status}</span>
        </div>
      </div>
    </div>
  );
};

const Library = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Library");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  const handleNavClick = (label, path) => {
    setActiveNav(label);
    navigate(path);
    setSidebarOpen(false);
  };

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.layout}>

      {/* Overlay */}
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <button className={styles.sidebarClose} onClick={() => setSidebarOpen(false)}>
          <MdClose size={20} />
        </button>

        <div className={styles.logo}>
          <img src={TeslaLogo} alt="TESLA" className={styles.logoImage} />
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`${styles.navItem} ${activeNav === item.label ? styles.navActive : ""}`}
              onClick={() => handleNavClick(item.label, item.path)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.navSupport}>Support</div>
        <nav className={styles.nav}>
          {supportItems.map((item) => (
            <button
              key={item.label}
              className={`${styles.navItem} ${activeNav === item.label ? styles.navActive : ""}`}
              onClick={() => handleNavClick(item.label, item.path)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.logoutContainer}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <MdLogout size={18} className={styles.logoutIcon} />
            <span className={styles.logoutLabel}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.hamburger} onClick={() => setSidebarOpen(true)}>
              <MdMenu size={22} />
            </button>
            <h1 className={styles.pageTitle}>Library</h1>
            <span className={styles.itemCount}>{filteredItems.length} items</span>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.addBtn}><MdAdd size={16} /><span className={styles.btnLabel}>Add New</span></button>
            <button className={styles.downloadBtn}><MdDownload size={16} /><span className={styles.btnLabel}>Download</span></button>
          </div>
        </div>

        {/* Search + Filters */}
        <div className={styles.searchBar}>
          <div className={styles.searchWrapper}>
            <MdSearch className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Search library..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.filterActions}>
            <button className={styles.filterBtn}><MdFilterList size={18} /></button>
            <button className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.activeView : ''}`} onClick={() => setViewMode('grid')}>
              <MdGridOn size={18} />
            </button>
            <button className={`${styles.viewBtn} ${viewMode === 'list' ? styles.activeView : ''}`} onClick={() => setViewMode('list')}>
              <MdViewList size={18} />
            </button>
            <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Recent</option>
              <option value="popular">Popular</option>
              <option value="rating">Rating</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryBtn} ${selectedCategory === cat.name ? styles.categoryActive : ""}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <span className={styles.categoryIcon}>{cat.icon}</span>
              <span className={styles.categoryName}>{cat.name}</span>
              <span className={styles.categoryCount}>{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={`${styles.libraryGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
          {filteredItems.map((item) => <LibraryCard key={item.id} item={item} />)}
        </div>

        {filteredItems.length === 0 && (
          <div className={styles.emptyState}>
            <MdLibraryBooks size={48} className={styles.emptyIcon} />
            <h3>No items found</h3>
            <p>Try adjusting your search or filter</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default Library;