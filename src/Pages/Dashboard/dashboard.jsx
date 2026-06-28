import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css';
import TeslaLogo from '../../assets/images/TESLA.png';
import {
  MdDashboard,
  MdBarChart,
  MdLibraryBooks,
  MdPeople,
  MdChecklist,
  MdRocketLaunch,
  MdSettings,
  MdDownload,
  MdInfoOutline,
  MdArrowDropUp,
  MdArrowDropDown,
  MdLogout,
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

const topStats = [
  { label: "Active Users", value: "27", suffix: "/80" },
  { label: "Questions Answered", value: "3,298" },
  { label: "Av. Session Length", value: "2m 34s" },
];

const knowledgeStats = [
  { label: "Starting Knowledge", value: "64%", info: true },
  { label: "Current Knowledge", value: "86%" },
  { label: "Knowledge Gain", value: "+34%", positive: true },
];

const chartData = [
  { month: "JAN", value: 60 }, { month: "FEB", value: 80 },
  { month: "MAR", value: 100 }, { month: "APR", value: 120 },
  { month: "MAY", value: 90 }, { month: "JUN", value: 110 },
  { month: "JUL", value: 150 }, { month: "AUG", value: 200 },
  { month: "SEP", value: 230 }, { month: "OCT", value: 270 },
  { month: "NOV", value: 310 }, { month: "DEC", value: 340 },
];

const MAX_CHART = 400;
const Y_LABELS = [400, 300, 200, 100, 0];

const weakTopics = [
  { label: "Food Safety", pct: 74, color: "#f97316" },
  { label: "Compliance Basics Procedures", pct: 52, color: "#f97316" },
  { label: "Company Networking", pct: 36, color: "#ef4444" },
];

const strongTopics = [
  { label: "Covid Protocols", pct: 95, color: "#22c55e" },
  { label: "Cyber Security Basics", pct: 92, color: "#22c55e" },
  { label: "Social Media Policies", pct: 89, color: "#22c55e" },
];

const userLeaderboard = [
  { name: "Jesse Thomas", sub: "637 Points · 28% Correct", rank: 1, up: true, color: "#f97316" },
  { name: "Thisal Mathiyazhagan", sub: "637 Points · 89% Correct", rank: 2, up: false, color: "#3b82f6" },
];

const groupLeaderboard = [
  { name: "Houston Facility", sub: "52 Points / User · 97% Correct", rank: 1, up: true },
  { name: "Test Group", sub: "52 Points / User · 85% Correct", rank: 2, up: false },
];

const Sparkline = ({ positive }) => {
  const color = positive === false ? "#ef4444" : "#3b82f6";
  const d = positive === false
    ? "M0,10 C10,8 20,14 30,12 C40,10 50,16 60,14"
    : "M0,14 C10,12 20,8 30,10 C40,6 50,4 60,2";
  return (
    <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
};

const TopicRow = ({ label, pct, color }) => (
  <div className={styles.topicRow}>
    <div className={styles.topicThumb} />
    <div className={styles.topicInfo}>
      <span className={styles.topicLabel}>{label}</span>
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
    <span className={styles.topicPct}>{pct}%</span>
  </div>
);

const LeaderRow = ({ name, sub, rank, up, color }) => (
  <div className={styles.leaderRow}>
    <div className={styles.avatar} style={{ backgroundColor: color || "#e2e8f0" }}>
      <span className={styles.avatarText}>{name.charAt(0)}</span>
    </div>
    <div className={styles.leaderInfo}>
      <span className={styles.leaderName}>{name}</span>
      <span className={styles.leaderSub}>{sub}</span>
    </div>
    <div className={styles.rankBadge}>
      <span className={styles.rankNum}>{rank}</span>
      {up
        ? <MdArrowDropUp size={18} className={styles.rankUp} />
        : <MdArrowDropDown size={18} className={styles.rankDown} />}
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("All-time");
  const [people, setPeople] = useState("All");
  const [topic, setTopic] = useState("All");
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  const handleNavClick = (label, path) => {
    setActiveNav(label);
    navigate(path);
    setSidebarOpen(false); // close drawer on mobile after nav
  };

  return (
    <div className={styles.layout}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        {/* Close btn — mobile only */}
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
          {/* Hamburger — mobile only */}
          <button className={styles.hamburger} onClick={() => setSidebarOpen(true)}>
            <MdMenu size={22} />
          </button>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <button className={styles.downloadBtn}>
            <MdDownload size={14} /> <span className={styles.downloadLabel}>Download</span>
          </button>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <select className={styles.filterSelect} value={timeframe} onChange={e => setTimeframe(e.target.value)}>
            <option value="All-time">Timeframe: All-time</option>
            <option value="This Month">Timeframe: This Month</option>
            <option value="This Week">Timeframe: This Week</option>
          </select>
          <select className={styles.filterSelect} value={people} onChange={e => setPeople(e.target.value)}>
            <option value="All">People: All</option>
            <option value="Active">People: Active</option>
          </select>
          <select className={styles.filterSelect} value={topic} onChange={e => setTopic(e.target.value)}>
            <option value="All">Topic: All</option>
            <option value="Food Safety">Topic: Food Safety</option>
            <option value="Compliance">Topic: Compliance</option>
          </select>
        </div>

        {/* Stats + Chart */}
        <div className={styles.topRow}>
          <div className={styles.statsCol}>
            <div className={styles.statGroup}>
              {topStats.map((s) => (
                <div key={s.label} className={styles.statCard}>
                  <span className={styles.statLabel}>{s.label}</span>
                  <span className={styles.statValue}>
                    {s.value}
                    {s.suffix && <span className={styles.statSuffix}>{s.suffix}</span>}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.statGroup}>
              {knowledgeStats.map((s) => (
                <div key={s.label} className={styles.statCard}>
                  <span className={styles.statLabel}>
                    {s.label}{" "}
                    {s.info && <MdInfoOutline size={12} className={styles.infoIcon} />}
                  </span>
                  <span className={`${styles.statValue} ${s.positive ? styles.positive : ""}`}>
                    {s.value}
                  </span>
                  <Sparkline positive={s.positive} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <span className={styles.chartTitle}>Activity</span>
              <select className={styles.chartSelect}>
                <option>Month</option>
                <option>Week</option>
              </select>
            </div>
            <div className={styles.chartBody}>
              <div className={styles.yAxis}>
                {Y_LABELS.map((y) => (
                  <span key={y} className={styles.yLabel}>{y}</span>
                ))}
              </div>
              <div className={styles.chart}>
                {chartData.map((d) => (
                  <div key={d.month} className={styles.barCol}>
                    <div className={styles.barWrapper}>
                      <div className={styles.bar} style={{ height: `${(d.value / MAX_CHART) * 100}%` }} />
                    </div>
                    <span className={styles.barLabel}>{d.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Topics */}
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Weakest Topics</h3>
            {weakTopics.map((t) => <TopicRow key={t.label} {...t} />)}
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Strongest Topics</h3>
            {strongTopics.map((t) => <TopicRow key={t.label} {...t} />)}
          </div>
        </div>

        {/* Leaderboards */}
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>User Leaderboard</h3>
            {userLeaderboard.map((u) => <LeaderRow key={u.name} {...u} />)}
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Groups Leaderboard</h3>
            {groupLeaderboard.map((g) => <LeaderRow key={g.name} {...g} />)}
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;