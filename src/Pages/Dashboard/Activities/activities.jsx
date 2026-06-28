import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './activities.module.css';
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
  MdFilterList,
  MdSort,
  MdLogout,
  MdNotifications,
  MdEvent,
  MdWork,
  MdPerson,
  MdFolder,
  MdAssignment,
  MdCheckCircle,
  MdPending,
  MdCancel,
  MdSchedule,
  MdAccessTime,
  MdLocationOn,
  MdDescription,
  MdMoreVert,
  MdRefresh,
  MdDateRange,
  MdTrendingUp,
  MdTrendingDown,
  MdStar,
  MdStarBorder,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { FiActivity } from 'react-icons/fi';

// ── Navigation Data ──
const navItems = [
  { icon: <MdDashboard size={18} />, label: "Dashboard", path: "/dashboard" },
  { icon: <MdBarChart size={18} />, label: "Reports", path: "/reports" },
  { icon: <MdLibraryBooks size={18} />, label: "Library", path: "/library" },
  { icon: <MdPeople size={18} />, label: "People", path: "/people" },
  { icon: <MdChecklist size={18} />, label: "Activities", active: true, path: "/activities" },
];

const supportItems = [
  { icon: <MdRocketLaunch size={18} />, label: "Get Started", path: "/getstarted" },
  { icon: <MdSettings size={18} />, label: "Settings", path: "/settings" },
];

// ── Activities Data ──
const activitiesData = [
  {
    id: 1,
    type: "task",
    title: "Property Viewing Scheduled",
    description: "John Anderson scheduled a viewing for 123 Main St at 2:00 PM",
    user: "John Anderson",
    userAvatar: "JA",
    userColor: "#4CAF4F",
    status: "completed",
    priority: "high",
    date: "2024-03-20",
    time: "10:30 AM",
    category: "Property",
    location: "123 Main St, NY",
    comments: 3,
    attachments: 2,
  },
  {
    id: 2,
    type: "meeting",
    title: "Team Meeting - Q1 Review",
    description: "Weekly team sync to review Q1 performance and goals",
    user: "Sarah Williams",
    userAvatar: "SW",
    userColor: "#2196f3",
    status: "in-progress",
    priority: "medium",
    date: "2024-03-20",
    time: "11:00 AM",
    category: "Meeting",
    location: "Conference Room A",
    comments: 5,
    attachments: 1,
  },
  {
    id: 3,
    type: "task",
    title: "Client Document Submission",
    description: "Submit legal documents for client property purchase",
    user: "Michael Chen",
    userAvatar: "MC",
    userColor: "#ff9800",
    status: "pending",
    priority: "high",
    date: "2024-03-21",
    time: "09:00 AM",
    category: "Document",
    location: "Office",
    comments: 2,
    attachments: 4,
  },
  {
    id: 4,
    type: "event",
    title: "Real Estate Webinar",
    description: "Online webinar about current market trends and investment strategies",
    user: "Emily Davis",
    userAvatar: "ED",
    userColor: "#e91e63",
    status: "completed",
    priority: "low",
    date: "2024-03-19",
    time: "03:00 PM",
    category: "Webinar",
    location: "Virtual",
    comments: 8,
    attachments: 3,
  },
  {
    id: 5,
    type: "task",
    title: "Property Inspection",
    description: "Conduct inspection for 456 Oak Ave before client viewing",
    user: "Robert Wilson",
    userAvatar: "RW",
    userColor: "#9c27b0",
    status: "in-progress",
    priority: "medium",
    date: "2024-03-20",
    time: "01:00 PM",
    category: "Property",
    location: "456 Oak Ave, CA",
    comments: 1,
    attachments: 0,
  },
  {
    id: 6,
    type: "meeting",
    title: "Client Consultation",
    description: "Virtual consultation with new client about property investment",
    user: "Lisa Thompson",
    userAvatar: "LT",
    userColor: "#00bcd4",
    status: "pending",
    priority: "high",
    date: "2024-03-21",
    time: "02:30 PM",
    category: "Consultation",
    location: "Virtual",
    comments: 0,
    attachments: 0,
  },
  {
    id: 7,
    type: "task",
    title: "Contract Review",
    description: "Review and finalize contract for property sale",
    user: "James Martinez",
    userAvatar: "JM",
    userColor: "#f44336",
    status: "completed",
    priority: "high",
    date: "2024-03-18",
    time: "04:00 PM",
    category: "Legal",
    location: "Office",
    comments: 6,
    attachments: 5,
  },
  {
    id: 8,
    type: "event",
    title: "Property Auction",
    description: "Annual property auction event with multiple listings",
    user: "Amanda Foster",
    userAvatar: "AF",
    userColor: "#8bc34a",
    status: "pending",
    priority: "medium",
    date: "2024-03-22",
    time: "10:00 AM",
    category: "Event",
    location: "Convention Center",
    comments: 4,
    attachments: 2,
  },
  {
    id: 9,
    type: "task",
    title: "Market Analysis Report",
    description: "Prepare monthly market analysis report for stakeholders",
    user: "John Anderson",
    userAvatar: "JA",
    userColor: "#4CAF4F",
    status: "in-progress",
    priority: "medium",
    date: "2024-03-20",
    time: "09:30 AM",
    category: "Reporting",
    location: "Office",
    comments: 2,
    attachments: 1,
  },
  {
    id: 10,
    type: "meeting",
    title: "Partnership Discussion",
    description: "Discuss partnership opportunities with local real estate firms",
    user: "Sarah Williams",
    userAvatar: "SW",
    userColor: "#2196f3",
    status: "completed",
    priority: "low",
    date: "2024-03-17",
    time: "11:30 AM",
    category: "Partnership",
    location: "Downtown Office",
    comments: 3,
    attachments: 0,
  },
];

// ── Activity Card ──
const ActivityCard = ({ activity }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <MdCheckCircle className={styles.statusCompleted} />;
      case 'in-progress': return <MdPending className={styles.statusProgress} />;
      case 'pending': return <MdSchedule className={styles.statusPending} />;
      default: return <MdPending className={styles.statusPending} />;
    }
  };

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'high': return styles.priorityHigh;
      case 'medium': return styles.priorityMedium;
      case 'low': return styles.priorityLow;
      default: return '';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'task': return <MdAssignment />;
      case 'meeting': return <MdEvent />;
      case 'event': return <MdNotifications />;
      default: return <MdWork />;
    }
  };

  return (
    <div className={styles.activityCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardLeft}>
          <div className={styles.typeIcon} style={{ backgroundColor: `${activity.userColor}20`, color: activity.userColor }}>
            {getTypeIcon(activity.type)}
          </div>
          <div className={styles.activityInfo}>
            <h3 className={styles.activityTitle}>{activity.title}</h3>
            <div className={styles.activityMeta}>
              <span className={styles.metaItem}>
                <MdPerson size={14} /> {activity.user}
              </span>
              <span className={styles.metaItem}>
                <MdAccessTime size={14} /> {activity.date} at {activity.time}
              </span>
              <span className={styles.metaItem}>
                <MdLocationOn size={14} /> {activity.location}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.cardRight}>
          <span className={`${styles.priorityBadge} ${getPriorityClass(activity.priority)}`}>
            {activity.priority}
          </span>
          <span className={styles.statusBadge}>
            {getStatusIcon(activity.status)}
            {activity.status}
          </span>
          <button className={styles.moreBtn} onClick={() => setShowDetails(!showDetails)}>
            <MdMoreVert size={18} />
          </button>
        </div>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.activityDescription}>{activity.description}</p>
        <div className={styles.activityTags}>
          <span className={styles.tag}>
            <MdFolder size={12} /> {activity.category}
          </span>
          {activity.comments > 0 && (
            <span className={styles.tag}>
              💬 {activity.comments} comments
            </span>
          )}
          {activity.attachments > 0 && (
            <span className={styles.tag}>
              📎 {activity.attachments} attachments
            </span>
          )}
        </div>
      </div>

      {showDetails && (
        <div className={styles.cardDetails}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Status</span>
              <span className={styles.detailValue}>{activity.status}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Priority</span>
              <span className={styles.detailValue}>{activity.priority}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Category</span>
              <span className={styles.detailValue}>{activity.category}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Location</span>
              <span className={styles.detailValue}>{activity.location}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Date</span>
              <span className={styles.detailValue}>{activity.date}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Time</span>
              <span className={styles.detailValue}>{activity.time}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Activities ──
const Activities = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Activities");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("list");
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

  const getStatusCount = (status) => {
    return activitiesData.filter(a => a.status === status).length;
  };

  const filteredActivities = activitiesData
    .filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            activity.user.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "All" || activity.status === filterStatus;
      const matchesPriority = filterPriority === "All" || activity.priority === filterPriority;
      const matchesType = filterType === "All" || activity.type === filterType;
      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  const statuses = ["All", "completed", "in-progress", "pending"];
  const priorities = ["All", "high", "medium", "low"];
  const types = ["All", "task", "meeting", "event"];

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
            <h1 className={styles.pageTitle}>Activities</h1>
            <span className={styles.itemCount}>{filteredActivities.length} activities</span>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.refreshBtn}>
              <MdRefresh size={16} /> <span className={styles.btnLabel}>Refresh</span>
            </button>
            <button className={styles.downloadBtn}>
              <MdDownload size={14} /> <span className={styles.btnLabel}>Export</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#dbeafe', color: '#3b82f6' }}>
              <FiActivity size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{activitiesData.length}</span>
              <span className={styles.statLabel}>Total Activities</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#dcfce7', color: '#22c55e' }}>
              <MdCheckCircle size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{getStatusCount('completed')}</span>
              <span className={styles.statLabel}>Completed</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}>
              <MdPending size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{getStatusCount('in-progress')}</span>
              <span className={styles.statLabel}>In Progress</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fee2e2', color: '#ef4444' }}>
              <MdSchedule size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{getStatusCount('pending')}</span>
              <span className={styles.statLabel}>Pending</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={styles.searchBar}>
          <div className={styles.searchWrapper}>
            <MdSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search activities..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.filterActions}>
            <select 
              className={styles.filterSelect} 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {types.map(type => (
                <option key={type} value={type}>Type: {type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
            <select 
              className={styles.filterSelect} 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>Status: {status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
            <select 
              className={styles.filterSelect} 
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
              ))}
            </select>
            <select 
              className={styles.sortSelect} 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Sort: Recent</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="priority">Sort: Priority</option>
              <option value="status">Sort: Status</option>
            </select>
          </div>
        </div>

        {/* Activities List */}
        <div className={styles.activitiesList}>
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className={styles.emptyState}>
            <MdChecklist size={48} className={styles.emptyIcon} />
            <h3>No activities found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default Activities;