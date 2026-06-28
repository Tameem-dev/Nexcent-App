import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './reports.module.css';
import TeslaLogo from '../../../assets/images/TESLA.png';
import {
  MdDashboard,
  MdBarChart,
  MdLibraryBooks,
  MdPeople,
  MdChecklist,
  MdRocketLaunch,
  MdSettings,
  MdLogout,
  MdSearch,
  MdFilterList,
  MdDateRange,
  MdTrendingUp,
  MdTrendingDown,
  MdFileDownload,
  MdPrint,
  MdShare,
  MdMoreVert,
  MdRefresh,
  MdMenu,
  MdClose,
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

const reportCategories = [
  { id: 1, name: "All Reports", count: 24 },
  { id: 2, name: "Sales", count: 8 },
  { id: 3, name: "Marketing", count: 6 },
  { id: 4, name: "Finance", count: 5 },
  { id: 5, name: "Operations", count: 5 },
];

const reportsData = [
  { id: 1, title: "Q1 Sales Performance Report", type: "Sales", date: "2024-03-15", size: "2.4 MB", status: "Completed", views: 156, downloads: 42, icon: "📊", color: "#3b82f6" },
  { id: 2, title: "Marketing Campaign Analytics", type: "Marketing", date: "2024-03-14", size: "1.8 MB", status: "Processing", views: 89, downloads: 23, icon: "📈", color: "#22c55e" },
  { id: 3, title: "Financial Summary Q1 2024", type: "Finance", date: "2024-03-12", size: "3.2 MB", status: "Completed", views: 234, downloads: 67, icon: "💰", color: "#f59e0b" },
  { id: 4, title: "Monthly Operations Report", type: "Operations", date: "2024-03-10", size: "1.2 MB", status: "Completed", views: 78, downloads: 15, icon: "⚙️", color: "#8b5cf6" },
  { id: 5, title: "Customer Satisfaction Survey", type: "Marketing", date: "2024-03-08", size: "0.8 MB", status: "Pending", views: 45, downloads: 8, icon: "📋", color: "#ec4899" },
  { id: 6, title: "Q2 Revenue Projections", type: "Finance", date: "2024-03-05", size: "2.1 MB", status: "Completed", views: 312, downloads: 98, icon: "📉", color: "#06b6d4" },
];

const statsData = [
  { label: "Total Reports", value: "24", change: "+12%", positive: true },
  { label: "Downloads", value: "253", change: "+8%", positive: true },
  { label: "Views", value: "914", change: "+15%", positive: true },
  { label: "Pending", value: "3", change: "-2%", positive: false },
];

const Reports = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Reports");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Reports");
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

  const getStatusBadge = (status) => {
    const statusMap = {
      Completed: { color: "#22c55e", bg: "#dcfce7" },
      Processing: { color: "#f59e0b", bg: "#fef3c7" },
      Pending: { color: "#ef4444", bg: "#fee2e2" },
    };
    const style = statusMap[status] || statusMap.Pending;
    return (
      <span className={styles.statusBadge} style={{ backgroundColor: style.bg, color: style.color }}>
        {status}
      </span>
    );
  };

  const filteredReports = reportsData.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className={styles.pageTitle}>Reports</h1>
            <span className={styles.reportCount}>{filteredReports.length} reports</span>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.refreshBtn}><MdRefresh size={16} /><span className={styles.btnLabel}>Refresh</span></button>
            <button className={styles.exportBtn}><MdFileDownload size={16} /><span className={styles.btnLabel}>Export All</span></button>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {statsData.map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
              <div className={`${styles.statChange} ${stat.positive ? styles.positive : styles.negative}`}>
                {stat.positive ? <MdTrendingUp /> : <MdTrendingDown />}
                <span>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className={styles.controlsBar}>
          <div className={styles.searchWrapper}>
            <MdSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search reports..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.controlsRight}>
            <button className={styles.filterBtn}><MdFilterList size={16} /><span>Filters</span></button>
            <button className={styles.dateBtn}><MdDateRange size={16} /><span>Last 30 Days</span></button>
          </div>
        </div>

        {/* Categories */}
        <div className={styles.categoriesBar}>
          {reportCategories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryBtn} ${activeCategory === cat.name ? styles.categoryActive : ""}`}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.name}
              <span className={styles.categoryCount}>{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Reports */}
        <div className={styles.reportsList}>
          {filteredReports.map((report) => (
            <div key={report.id} className={styles.reportItem}>
              <div className={styles.reportIcon} style={{ backgroundColor: `${report.color}18`, color: report.color }}>
                {report.icon}
              </div>

              <div className={styles.reportInfo}>
                <div className={styles.reportHeader}>
                  <h3 className={styles.reportTitle}>{report.title}</h3>
                  <button className={styles.moreBtn}><MdMoreVert size={18} /></button>
                </div>
                <div className={styles.reportMeta}>
                  <span className={styles.reportType}>{report.type}</span>
                  <span><MdDateRange size={13} /> {report.date}</span>
                  <span>{report.size}</span>
                </div>
                <div className={styles.reportFooter}>
                  <div className={styles.reportStats}>
                    <span>👁 {report.views}</span>
                    <span>⬇ {report.downloads}</span>
                  </div>
                  {getStatusBadge(report.status)}
                </div>
              </div>

              <div className={styles.reportActions}>
                <button className={styles.actionBtn} title="Download"><MdFileDownload size={18} /></button>
                <button className={styles.actionBtn} title="Print"><MdPrint size={18} /></button>
                <button className={styles.actionBtn} title="Share"><MdShare size={18} /></button>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className={styles.emptyState}>
            <MdBarChart size={48} className={styles.emptyIcon} />
            <h3>No reports found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Reports;