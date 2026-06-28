import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './settings.module.css';
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
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdLock,
  MdNotifications,
  MdPalette,
  MdLanguage,
  MdSecurity,
  MdSave,
  MdEdit,
  MdVisibility,
  MdVisibilityOff,
  MdArrowForward,
  MdCheckCircle,
  MdWarning,
  MdInfoOutline,
  MdDelete,
  MdRefresh,
  MdDownload,
  MdUpload,
  MdBackup,
  MdDevices,
  MdDarkMode,
  MdLightMode,
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
  { icon: <MdChecklist size={18} />, label: "Activities", path: "/activities" },
];

const supportItems = [
  { icon: <MdRocketLaunch size={18} />, label: "Get Started", path: "/getstarted" },
  { icon: <MdSettings size={18} />, label: "Settings", active: true, path: "/settings" },
];

// ── Settings Data ──
const notificationPreferences = [
  { id: 1, label: "Email Notifications", description: "Receive updates via email", enabled: true },
  { id: 2, label: "Push Notifications", description: "Get real-time alerts on your device", enabled: true },
  { id: 3, label: "Activity Updates", description: "Notifications about team activities", enabled: false },
  { id: 4, label: "Report Reminders", description: "Weekly report summary emails", enabled: true },
  { id: 5, label: "System Announcements", description: "Important system updates", enabled: false },
];

const languageOptions = [
  { value: "en", label: "English (US)" },
  { value: "en-uk", label: "English (UK)" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "ja", label: "日本語" },
  { value: "zh", label: "中文" },
];

const themeOptions = [
  { value: "light", label: "Light", icon: <MdLightMode /> },
  { value: "dark", label: "Dark", icon: <MdDarkMode /> },
  { value: "system", label: "System Default", icon: <MdDevices /> },
];

// ── Settings ──
const Settings = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Settings");
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Load User Data from localStorage/sessionStorage ──
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (!isLoggedIn || !user) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      
      // Update profile form with user data
      setProfileForm(prev => ({
        ...prev,
        name: parsedUser.name || 'John Anderson',
        email: parsedUser.email || 'john.anderson@email.com',
        role: parsedUser.role || 'User',
        company: parsedUser.company || 'Nexcent Real Estate',
      }));
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, [navigate]);

  // ── Form State ──
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    bio: 'Real Estate Professional with 5+ years of experience in property management and sales.',
    company: 'Nexcent Real Estate',
    role: 'User',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    theme: "light",
    notifications: notificationPreferences,
  });

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

  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationToggle = (id) => {
    setPreferences({
      ...preferences,
      notifications: preferences.notifications.map(notif =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      ),
    });
  };

  const handleSave = () => {
    // Update user data in localStorage/sessionStorage
    const updatedUser = {
      ...userData,
      name: profileForm.name,
      email: profileForm.email,
      role: profileForm.role,
      company: profileForm.company,
    };

    if (localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } else {
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
    }

    setUserData(updatedUser);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <MdPerson /> },
    { id: "security", label: "Security", icon: <MdLock /> },
    { id: "notifications", label: "Notifications", icon: <MdNotifications /> },
    { id: "preferences", label: "Preferences", icon: <MdPalette /> },
  ];

  // Get initials for avatar
  const getInitials = () => {
    if (!userData) return 'U';
    const name = userData.name || 'User';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (!userData) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

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
            <h1 className={styles.pageTitle}>Settings</h1>
            <span className={styles.headerSubtitle}>Manage your account preferences</span>
          </div>
          <div className={styles.headerRight}>
            {saveSuccess && (
              <span className={styles.saveSuccess}>
                <MdCheckCircle /> Saved successfully!
              </span>
            )}
            <button className={styles.saveBtn} onClick={handleSave}>
              <MdSave size={16} /> <span className={styles.btnLabel}>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>

          {/* ── Profile Tab ── */}
          {activeTab === "profile" && (
            <div className={styles.tabPanel}>
              <div className={styles.profileHeader}>
                <div className={styles.avatarSection}>
                  <div className={styles.avatar}>
                    <span>{getInitials()}</span>
                  </div>
                  <div className={styles.avatarActions}>
                    <button className={styles.uploadBtn}>
                      <MdUpload /> <span className={styles.btnLabel}>Change Photo</span>
                    </button>
                    <button className={styles.removeBtn}>
                      <MdDelete /> <span className={styles.btnLabel}>Remove</span>
                    </button>
                  </div>
                </div>
                <div className={styles.profileInfo}>
                  <h2>{profileForm.name}</h2>
                  <p>{profileForm.role} • {profileForm.company}</p>
                  <p className={styles.userEmail}>
                    <MdEmail size={14} /> {profileForm.email}
                  </p>
                  <p className={styles.userJoined}>
                    Joined: {userData.joinedDate || 'January 2024'}
                  </p>
                </div>
              </div>

              <div className={styles.formSection}>
                <h3 className={styles.formTitle}>Personal Information</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className={styles.formInput}
                      value={profileForm.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className={styles.formInput}
                      value={profileForm.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      className={styles.formInput}
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Location</label>
                    <input
                      type="text"
                      name="location"
                      className={styles.formInput}
                      value={profileForm.location}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.formLabel}>Bio</label>
                    <textarea
                      name="bio"
                      className={styles.formTextarea}
                      rows="3"
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Company</label>
                    <input
                      type="text"
                      name="company"
                      className={styles.formInput}
                      value={profileForm.company}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Role</label>
                    <select
                      name="role"
                      className={styles.formSelect}
                      value={profileForm.role}
                      onChange={handleProfileChange}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* User Info Card */}
              <div className={styles.userInfoCard}>
                <h3 className={styles.formTitle}>Account Information</h3>
                <div className={styles.userInfoGrid}>
                  <div className={styles.userInfoItem}>
                    <span className={styles.userInfoLabel}>User ID</span>
                    <span className={styles.userInfoValue}>#{userData.id || 'N/A'}</span>
                  </div>
                  <div className={styles.userInfoItem}>
                    <span className={styles.userInfoLabel}>Joined Date</span>
                    <span className={styles.userInfoValue}>{userData.joinedDate || 'January 2024'}</span>
                  </div>
                  <div className={styles.userInfoItem}>
                    <span className={styles.userInfoLabel}>Role</span>
                    <span className={styles.userInfoValue}>{userData.role || 'User'}</span>
                  </div>
                  <div className={styles.userInfoItem}>
                    <span className={styles.userInfoLabel}>Status</span>
                    <span className={`${styles.userInfoValue} ${styles.statusActive}`}>Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Security Tab ── */}
          {activeTab === "security" && (
            <div className={styles.tabPanel}>
              <div className={styles.formSection}>
                <h3 className={styles.formTitle}>Change Password</h3>
                <div className={styles.formGrid}>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.formLabel}>Current Password</label>
                    <div className={styles.passwordWrapper}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        className={styles.formInput}
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter your current password"
                      />
                      <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                      </button>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      className={styles.formInput}
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className={styles.formInput}
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <div className={styles.passwordRequirements}>
                  <p className={styles.requirementsTitle}>Password must contain:</p>
                  <ul className={styles.requirementsList}>
                    <li>At least 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                </div>
              </div>

              <div className={styles.formSection}>
                <h3 className={styles.formTitle}>Security Settings</h3>
                <div className={styles.securityOptions}>
                  <div className={styles.securityOption}>
                    <div className={styles.securityInfo}>
                      <h4>Two-Factor Authentication</h4>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <button className={styles.setupBtn}>Setup</button>
                  </div>
                  <div className={styles.securityOption}>
                    <div className={styles.securityInfo}>
                      <h4>Sessions</h4>
                      <p>Manage active sessions and devices</p>
                    </div>
                    <button className={styles.manageBtn}>Manage</button>
                  </div>
                  <div className={styles.securityOption}>
                    <div className={styles.securityInfo}>
                      <h4>Login History</h4>
                      <p>View recent login activity</p>
                    </div>
                    <button className={styles.viewBtn}>View</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Notifications Tab ── */}
          {activeTab === "notifications" && (
            <div className={styles.tabPanel}>
              <div className={styles.formSection}>
                <h3 className={styles.formTitle}>Notification Preferences</h3>
                <p className={styles.formSubtitle}>Manage how you receive notifications</p>
                <div className={styles.notificationsList}>
                  {preferences.notifications.map((notif) => (
                    <div key={notif.id} className={styles.notificationItem}>
                      <div className={styles.notificationInfo}>
                        <h4>{notif.label}</h4>
                        <p>{notif.description}</p>
                      </div>
                      <label className={styles.toggleSwitch}>
                        <input
                          type="checkbox"
                          checked={notif.enabled}
                          onChange={() => handleNotificationToggle(notif.id)}
                        />
                        <span className={styles.toggleSlider}></span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.formSection}>
                <h3 className={styles.formTitle}>Email Frequency</h3>
                <div className={styles.radioGroup}>
                  <label className={styles.radioOption}>
                    <input type="radio" name="frequency" value="realtime" defaultChecked />
                    <span className={styles.radioLabel}>Real-time</span>
                  </label>
                  <label className={styles.radioOption}>
                    <input type="radio" name="frequency" value="daily" />
                    <span className={styles.radioLabel}>Daily Digest</span>
                  </label>
                  <label className={styles.radioOption}>
                    <input type="radio" name="frequency" value="weekly" />
                    <span className={styles.radioLabel}>Weekly</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ── Preferences Tab ── */}
          {activeTab === "preferences" && (
            <div className={styles.tabPanel}>
              <div className={styles.formSection}>
                <h3 className={styles.formTitle}>Appearance</h3>
                <div className={styles.themeOptions}>
                  {themeOptions.map((theme) => (
                    <button
                      key={theme.value}
                      className={`${styles.themeOption} ${preferences.theme === theme.value ? styles.themeActive : ""}`}
                      onClick={() => setPreferences({ ...preferences, theme: theme.value })}
                    >
                      <span className={styles.themeIcon}>{theme.icon}</span>
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formSection}>
                <h3 className={styles.formTitle}>Language</h3>
                <div className={styles.languageSelect}>
                  <select
                    className={styles.formSelect}
                    value={preferences.language}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formSection}>
                <h3 className={styles.formTitle}>Data & Privacy</h3>
                <div className={styles.dataOptions}>
                  <div className={styles.dataOption}>
                    <div className={styles.dataInfo}>
                      <h4>Export Data</h4>
                      <p>Download all your data in a single file</p>
                    </div>
                    <button className={styles.exportBtn}><MdDownload /> Export</button>
                  </div>
                  <div className={styles.dataOption}>
                    <div className={styles.dataInfo}>
                      <h4>Delete Account</h4>
                      <p>Permanently delete your account and all data</p>
                    </div>
                    <button className={styles.deleteAccountBtn}><MdDelete /> Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default Settings;