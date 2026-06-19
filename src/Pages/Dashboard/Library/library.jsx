import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './library.module.css';
import TeslaLogo from '../../../assets/images/TESLA.png';
import {
  MdDashboard,
  MdBarChart,
  MdLibraryBooks,
  MdPeople,
  MdChecklist,
  MdRocketLaunch,
  MdSettings,
  MdDownload,
  MdSearch,
  MdAdd,
  MdDelete,
  MdEdit,
  MdVisibility,
  MdLogout,
  MdBook,
  MdBookmark,
  MdBookmarkBorder,
  MdStar,
  MdStarBorder,
  MdFolder,
  MdInsertDriveFile,
  MdDateRange,
  MdPerson,
  MdMenuBook,
  MdAutoStories,
  MdSchool,
  MdDescription,
  MdPictureAsPdf,
  MdVideoLibrary,
  MdLink,
  MdMoreVert,
  MdFilterList,
  MdSort,
  MdGridOn,
  MdViewList,
} from "react-icons/md";

// ── Navigation Data ──
const navItems = [
  { icon: <MdDashboard size={16} />, label: "Dashboard", path: "/dashboard" },
  { icon: <MdBarChart size={16} />, label: "Reports", path: "/reports" },
  { icon: <MdLibraryBooks size={16} />, label: "Library", active: true, path: "/library" },
  { icon: <MdPeople size={16} />, label: "People", path: "/people" },
  { icon: <MdChecklist size={16} />, label: "Activities", path: "/activities" },
];

const supportItems = [
  { icon: <MdRocketLaunch size={16} />, label: "Get Started" },
  { icon: <MdSettings size={16} />, label: "Settings" },
];

// ── Library Data ──
const categories = [
  { id: 1, name: "All", count: 24, icon: <MdLibraryBooks /> },
  { id: 2, name: "Books", count: 8, icon: <MdMenuBook /> },
  { id: 3, name: "Articles", count: 6, icon: <MdDescription /> },
  { id: 4, name: "Videos", count: 4, icon: <MdVideoLibrary /> },
  { id: 5, name: "Documents", count: 3, icon: <MdPictureAsPdf /> },
  { id: 6, name: "Links", count: 3, icon: <MdLink /> },
];

const libraryItems = [
  {
    id: 1,
    title: "Real Estate Investment Guide 2024",
    type: "Book",
    category: "Books",
    author: "John Smith",
    date: "2024-01-15",
    pages: 245,
    rating: 4.5,
    description: "Comprehensive guide to real estate investing in the current market.",
    icon: <MdMenuBook />,
    color: "#4CAF4F",
    tags: ["Investing", "Real Estate", "Finance"],
    status: "Available",
  },
  {
    id: 2,
    title: "Property Management Best Practices",
    type: "Document",
    category: "Documents",
    author: "Sarah Johnson",
    date: "2024-02-01",
    pages: 12,
    rating: 4.8,
    description: "Best practices for managing rental properties effectively.",
    icon: <MdDescription />,
    color: "#2196f3",
    tags: ["Management", "Rental", "Property"],
    status: "Available",
  },
  {
    id: 3,
    title: "Market Trends Analysis 2024",
    type: "Article",
    category: "Articles",
    author: "Michael Chen",
    date: "2024-03-10",
    pages: 8,
    rating: 4.2,
    description: "Analysis of current real estate market trends and predictions.",
    icon: <MdDescription />,
    color: "#ff9800",
    tags: ["Market", "Analysis", "Trends"],
    status: "Available",
  },
  {
    id: 4,
    title: "Mortgage Calculator Tutorial",
    type: "Video",
    category: "Videos",
    author: "Emily Davis",
    date: "2024-03-15",
    duration: "15:30",
    rating: 4.9,
    description: "Step-by-step tutorial on using mortgage calculators.",
    icon: <MdVideoLibrary />,
    color: "#e91e63",
    tags: ["Mortgage", "Tutorial", "Finance"],
    status: "Available",
  },
  {
    id: 5,
    title: "Legal Aspects of Real Estate",
    type: "Book",
    category: "Books",
    author: "Robert Wilson",
    date: "2024-02-20",
    pages: 320,
    rating: 4.3,
    description: "Understanding the legal framework of real estate transactions.",
    icon: <MdMenuBook />,
    color: "#9c27b0",
    tags: ["Legal", "Contracts", "Law"],
    status: "Available",
  },
  {
    id: 6,
    title: "Commercial Property Valuation",
    type: "Document",
    category: "Documents",
    author: "Lisa Thompson",
    date: "2024-03-01",
    pages: 18,
    rating: 4.6,
    description: "Methods and techniques for commercial property valuation.",
    icon: <MdDescription />,
    color: "#00bcd4",
    tags: ["Commercial", "Valuation", "Investment"],
    status: "Available",
  },
  {
    id: 7,
    title: "Sustainable Building Practices",
    type: "Article",
    category: "Articles",
    author: "David Green",
    date: "2024-03-20",
    pages: 6,
    rating: 4.0,
    description: "Sustainable and eco-friendly building practices for modern properties.",
    icon: <MdDescription />,
    color: "#8bc34a",
    tags: ["Sustainability", "Green", "Building"],
    status: "Available",
  },
  {
    id: 8,
    title: "Real Estate Negotiation Skills",
    type: "Video",
    category: "Videos",
    author: "Amanda Foster",
    date: "2024-04-01",
    duration: "22:45",
    rating: 4.7,
    description: "Essential negotiation skills for real estate professionals.",
    icon: <MdVideoLibrary />,
    color: "#f44336",
    tags: ["Negotiation", "Skills", "Professional"],
    status: "Available",
  },
];

// ── Library Item Card ──
const LibraryCard = ({ item }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<MdStar key={i} className={styles.starFilled} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<MdStar key={i} className={styles.starHalf} />);
      } else {
        stars.push(<MdStarBorder key={i} className={styles.starEmpty} />);
      }
    }
    return stars;
  };

  return (
    <div className={styles.libraryCard}>
      <div className={styles.cardIcon} style={{ backgroundColor: `${item.color}20` }}>
        <span style={{ color: item.color }}>{item.icon}</span>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <div className={styles.cardActions}>
            <button 
              className={styles.bookmarkBtn}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              {isBookmarked ? <MdBookmark /> : <MdBookmarkBorder />}
            </button>
            <button 
              className={styles.moreBtn}
              onClick={() => setShowMenu(!showMenu)}
            >
              <MdMoreVert />
            </button>
          </div>
        </div>
        <p className={styles.cardAuthor}>
          <MdPerson size={14} /> {item.author}
        </p>
        <p className={styles.cardDescription}>{item.description}</p>
        <div className={styles.cardMeta}>
          <span className={styles.cardType}>
            <MdFolder size={14} /> {item.category}
          </span>
          <span className={styles.cardDate}>
            <MdDateRange size={14} /> {item.date}
          </span>
          {item.pages && (
            <span className={styles.cardPages}>{item.pages} pages</span>
          )}
          {item.duration && (
            <span className={styles.cardDuration}>{item.duration}</span>
          )}
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.cardTags}>
            {item.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <div className={styles.cardRating}>
            {renderStars(item.rating)}
            <span className={styles.ratingText}>{item.rating}</span>
          </div>
        </div>
        <div className={styles.cardStatus}>
          <span className={styles.statusBadge}>
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Library ──
const Library = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Library");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleNavClick = (label, path) => {
    setActiveNav(label);
    navigate(path);
  };

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.layout}>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
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
            <button key={item.label} className={styles.navItem}>
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
            <h1 className={styles.pageTitle}>Library</h1>
            <span className={styles.itemCount}>{filteredItems.length} items</span>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.addBtn}>
              <MdAdd size={18} /> Add New
            </button>
            <button className={styles.downloadBtn}>
              <MdDownload size={14} /> Download
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={styles.searchBar}>
          <div className={styles.searchWrapper}>
            <MdSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search library..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.filterActions}>
            <button className={styles.filterBtn}>
              <MdFilterList size={18} />
            </button>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.activeView : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <MdGridOn size={18} />
            </button>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.activeView : ''}`}
              onClick={() => setViewMode('list')}
            >
              <MdViewList size={18} />
            </button>
            <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Sort by: Recent</option>
              <option value="popular">Sort by: Popular</option>
              <option value="rating">Sort by: Rating</option>
              <option value="title">Sort by: Title</option>
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
              {cat.name}
              <span className={styles.categoryCount}>{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Library Grid */}
        <div className={`${styles.libraryGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
          {filteredItems.map((item) => (
            <LibraryCard key={item.id} item={item} />
          ))}
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