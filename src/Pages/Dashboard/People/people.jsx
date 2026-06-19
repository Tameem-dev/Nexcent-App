import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './people.module.css';
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
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCalendarToday,
  MdMoreVert,
  MdFilterList,
  MdSort,
  MdGridView,
  MdViewList,
  MdCheckCircle,
  MdCancel,
  MdPending,
  MdVerified,
  MdStar,
  MdStarBorder,
} from "react-icons/md";

// ── Navigation Data ──
const navItems = [
  { icon: <MdDashboard size={16} />, label: "Dashboard", path: "/dashboard" },
  { icon: <MdBarChart size={16} />, label: "Reports", path: "/reports" },
  { icon: <MdLibraryBooks size={16} />, label: "Library", path: "/library" },
  { icon: <MdPeople size={16} />, label: "People", active: true, path: "/people" },
  { icon: <MdChecklist size={16} />, label: "Activities", path: "/activities" },
];

const supportItems = [
  { icon: <MdRocketLaunch size={16} />, label: "Get Started" },
  { icon: <MdSettings size={16} />, label: "Settings" },
];

// ── People Data ──
const peopleData = [
  {
    id: 1,
    name: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    role: "Admin",
    department: "Management",
    status: "Active",
    joinDate: "2023-01-15",
    avatar: "JA",
    color: "#4CAF4F",
    permissions: ["Full Access", "Manage Users", "View Reports"],
    lastActive: "2 hours ago",
    projects: 12,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@email.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, USA",
    role: "Manager",
    department: "Sales",
    status: "Active",
    joinDate: "2023-03-20",
    avatar: "SW",
    color: "#2196f3",
    permissions: ["Manage Team", "View Reports", "Edit Content"],
    lastActive: "1 hour ago",
    projects: 8,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 345-6789",
    location: "San Francisco, USA",
    role: "User",
    department: "Engineering",
    status: "Active",
    joinDate: "2023-06-10",
    avatar: "MC",
    color: "#ff9800",
    permissions: ["View Reports", "Edit Content"],
    lastActive: "3 hours ago",
    projects: 5,
    rating: 4.3,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, USA",
    role: "User",
    department: "Marketing",
    status: "Inactive",
    joinDate: "2023-08-05",
    avatar: "ED",
    color: "#e91e63",
    permissions: ["View Reports"],
    lastActive: "2 days ago",
    projects: 3,
    rating: 4.1,
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "+1 (555) 567-8901",
    location: "Austin, USA",
    role: "Manager",
    department: "Operations",
    status: "Active",
    joinDate: "2023-02-28",
    avatar: "RW",
    color: "#9c27b0",
    permissions: ["Manage Team", "Full Access", "View Reports"],
    lastActive: "30 minutes ago",
    projects: 15,
    rating: 4.9,
  },
  {
    id: 6,
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    phone: "+1 (555) 678-9012",
    location: "Miami, USA",
    role: "User",
    department: "Design",
    status: "Pending",
    joinDate: "2023-10-01",
    avatar: "LT",
    color: "#00bcd4",
    permissions: ["View Reports", "Edit Content"],
    lastActive: "1 day ago",
    projects: 2,
    rating: 4.0,
  },
  {
    id: 7,
    name: "James Martinez",
    email: "james.martinez@email.com",
    phone: "+1 (555) 789-0123",
    location: "Seattle, USA",
    role: "Admin",
    department: "IT",
    status: "Active",
    joinDate: "2023-04-12",
    avatar: "JM",
    color: "#f44336",
    permissions: ["Full Access", "Manage Users", "System Settings"],
    lastActive: "5 hours ago",
    projects: 20,
    rating: 4.7,
  },
  {
    id: 8,
    name: "Amanda Foster",
    email: "amanda.foster@email.com",
    phone: "+1 (555) 890-1234",
    location: "Denver, USA",
    role: "User",
    department: "HR",
    status: "Active",
    joinDate: "2023-07-19",
    avatar: "AF",
    color: "#8bc34a",
    permissions: ["View Reports", "Edit Content"],
    lastActive: "4 hours ago",
    projects: 6,
    rating: 4.4,
  },
];

// ── Status Badge ──
const StatusBadge = ({ status }) => {
  const statusConfig = {
    Active: { icon: <MdCheckCircle />, color: "#22c55e", bg: "#dcfce7" },
    Inactive: { icon: <MdCancel />, color: "#ef4444", bg: "#fee2e2" },
    Pending: { icon: <MdPending />, color: "#f59e0b", bg: "#fef3c7" },
  };

  const config = statusConfig[status] || statusConfig.Pending;

  return (
    <span className={styles.statusBadge} style={{ backgroundColor: config.bg, color: config.color }}>
      {config.icon}
      {status}
    </span>
  );
};

// ── Role Badge ──
const RoleBadge = ({ role }) => {
  const roleConfig = {
    Admin: { color: "#7c3aed", bg: "#ede9fe" },
    Manager: { color: "#2563eb", bg: "#dbeafe" },
    User: { color: "#64748b", bg: "#f1f5f9" },
  };

  const config = roleConfig[role] || roleConfig.User;

  return (
    <span className={styles.roleBadge} style={{ backgroundColor: config.bg, color: config.color }}>
      {role}
    </span>
  );
};

// ── Star Rating ──
const StarRating = ({ rating }) => {
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

  return (
    <div className={styles.starRating}>
      {stars}
      <span className={styles.ratingText}>{rating}</span>
    </div>
  );
};

// ── People Card ──
const PeopleCard = ({ person, onEdit, onDelete, onView }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.peopleCard}>
      <div className={styles.cardHeader}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar} style={{ backgroundColor: person.color }}>
            {person.avatar}
          </div>
          <StatusBadge status={person.status} />
        </div>
        <div className={styles.cardActions}>
          <button className={styles.actionBtn} onClick={() => onView(person)}>
            <MdVisibility size={18} />
          </button>
          <button className={styles.actionBtn} onClick={() => onEdit(person)}>
            <MdEdit size={18} />
          </button>
          <button className={styles.actionBtn} onClick={() => onDelete(person)}>
            <MdDelete size={18} />
          </button>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.personName}>{person.name}</h3>
        <div className={styles.personMeta}>
          <span className={styles.personEmail}>
            <MdEmail size={14} /> {person.email}
          </span>
          <span className={styles.personPhone}>
            <MdPhone size={14} /> {person.phone}
          </span>
          <span className={styles.personLocation}>
            <MdLocationOn size={14} /> {person.location}
          </span>
        </div>

        <div className={styles.personDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Role</span>
            <RoleBadge role={person.role} />
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Department</span>
            <span className={styles.detailValue}>{person.department}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Join Date</span>
            <span className={styles.detailValue}>
              <MdCalendarToday size={12} /> {person.joinDate}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Last Active</span>
            <span className={styles.detailValue}>{person.lastActive}</span>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.personStats}>
            <span className={styles.statItem}>
              <strong>{person.projects}</strong> Projects
            </span>
            <span className={styles.statItem}>
              <StarRating rating={person.rating} />
            </span>
          </div>
          <div className={styles.permissions}>
            {person.permissions.slice(0, 2).map((perm, index) => (
              <span key={index} className={styles.permissionTag}>{perm}</span>
            ))}
            {person.permissions.length > 2 && (
              <span className={styles.permissionTag}>+{person.permissions.length - 2}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── People ──
const People = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("People");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");

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

  const handleEdit = (person) => {
    console.log('Edit:', person);
    // Implement edit functionality
  };

  const handleDelete = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      console.log('Delete:', person);
      // Implement delete functionality
    }
  };

  const handleView = (person) => {
    console.log('View:', person);
    // Implement view functionality
  };

  const filteredPeople = peopleData
    .filter(person => {
      const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            person.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = filterRole === "All" || person.role === filterRole;
      const matchesStatus = filterStatus === "All" || person.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "role") return a.role.localeCompare(b.role);
      if (sortBy === "department") return a.department.localeCompare(b.department);
      if (sortBy === "date") return new Date(b.joinDate) - new Date(a.joinDate);
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const roles = ["All", ...new Set(peopleData.map(p => p.role))];
  const statuses = ["All", ...new Set(peopleData.map(p => p.status))];

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
            <h1 className={styles.pageTitle}>People</h1>
            <span className={styles.itemCount}>{filteredPeople.length} members</span>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.addBtn}>
              <MdAdd size={18} /> Add Member
            </button>
            <button className={styles.downloadBtn}>
              <MdDownload size={14} /> Export
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={styles.searchBar}>
          <div className={styles.searchWrapper}>
            <MdSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search people..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.filterActions}>
            <select 
              className={styles.filterSelect} 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              {roles.map(role => (
                <option key={role} value={role}>Role: {role}</option>
              ))}
            </select>
            <select 
              className={styles.filterSelect} 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>Status: {status}</option>
              ))}
            </select>
            <select 
              className={styles.sortSelect} 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort: Name</option>
              <option value="role">Sort: Role</option>
              <option value="department">Sort: Department</option>
              <option value="date">Sort: Join Date</option>
              <option value="rating">Sort: Rating</option>
            </select>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.activeView : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <MdGridView size={18} />
            </button>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.activeView : ''}`}
              onClick={() => setViewMode('list')}
            >
              <MdViewList size={18} />
            </button>
          </div>
        </div>

        {/* People Grid */}
        <div className={`${styles.peopleGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
          {filteredPeople.map((person) => (
            <PeopleCard 
              key={person.id} 
              person={person}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>

        {filteredPeople.length === 0 && (
          <div className={styles.emptyState}>
            <MdPeople size={48} className={styles.emptyIcon} />
            <h3>No people found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default People;