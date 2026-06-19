import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './getStarted.module.css';
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
  MdArrowForward,
  MdCheckCircle,
  MdSchool,
  MdBuild,
  MdPeople as MdPeopleIcon,
  MdAnalytics,
  MdVerified,
  MdVideoLibrary,
  MdDescription,
  MdLink,
  MdDownload,
  MdPlayArrow,
  MdStar,
  MdTrendingUp,
  MdAutoAwesome,
  MdLightbulb,
  MdAssignment,
  MdTimer,
  MdEmojiEvents,
  MdInsights,
} from "react-icons/md";
import { FiActivity } from 'react-icons/fi';

// ── Navigation Data ──
const navItems = [
  { icon: <MdDashboard size={16} />, label: "Dashboard", path: "/dashboard" },
  { icon: <MdBarChart size={16} />, label: "Reports", path: "/reports" },
  { icon: <MdLibraryBooks size={16} />, label: "Library", path: "/library" },
  { icon: <MdPeople size={16} />, label: "People", path: "/people" },
  { icon: <MdChecklist size={16} />, label: "Activities", path: "/activities" },
];

const supportItems = [
  { icon: <MdRocketLaunch size={16} />, label: "Get Started", active: true, path: "/getstarted" },
  { icon: <MdSettings size={16} />, label: "Settings", path: "/settings" },
];

// ── Steps Data ──
const steps = [
  {
    id: 1,
    title: "Create Your Account",
    description: "Sign up for a free account and set up your profile. It only takes a few minutes.",
    icon: <MdVerified />,
    color: "#3b82f6",
    completed: true,
    link: "/signup",
  },
  {
    id: 2,
    title: "Complete Your Profile",
    description: "Add your personal information, company details, and preferences.",
    icon: <MdPeopleIcon />,
    color: "#22c55e",
    completed: false,
    link: "/profile",
  },
  {
    id: 3,
    title: "Explore the Dashboard",
    description: "Familiarize yourself with the dashboard and all available features.",
    icon: <MdDashboard />,
    color: "#f59e0b",
    completed: false,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "Invite Team Members",
    description: "Invite your colleagues to collaborate and work together efficiently.",
    icon: <MdPeople />,
    color: "#8b5cf6",
    completed: false,
    link: "/people",
  },
  {
    id: 5,
    title: "Start Your First Project",
    description: "Create your first project and begin tracking your progress.",
    icon: <MdAssignment />,
    color: "#ec4899",
    completed: false,
    link: "/activities",
  },
];

// ── Features Data ──
const features = [
  {
    id: 1,
    title: "Easy Onboarding",
    description: "Get started quickly with our intuitive onboarding process.",
    icon: <MdAutoAwesome />,
    color: "#3b82f6",
  },
  {
    id: 2,
    title: "Interactive Tutorials",
    description: "Learn with guided tutorials and interactive walkthroughs.",
    icon: <MdSchool />,
    color: "#22c55e",
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Our support team is available around the clock to help you.",
    icon: <MdBuild />,
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Analytics & Insights",
    description: "Get valuable insights with powerful analytics tools.",
    icon: <MdAnalytics />,
    color: "#8b5cf6",
  },
];

// ── Tutorials Data ──
const tutorials = [
  {
    id: 1,
    title: "Getting Started Guide",
    description: "Learn the basics of the platform in 5 minutes.",
    duration: "5 min",
    level: "Beginner",
    icon: <MdPlayArrow />,
    color: "#3b82f6",
  },
  {
    id: 2,
    title: "Dashboard Overview",
    description: "Understanding all dashboard features and metrics.",
    duration: "10 min",
    level: "Beginner",
    icon: <MdPlayArrow />,
    color: "#22c55e",
  },
  {
    id: 3,
    title: "Advanced Reporting",
    description: "Create and customize detailed reports.",
    duration: "15 min",
    level: "Intermediate",
    icon: <MdPlayArrow />,
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Team Collaboration",
    description: "Work effectively with your team members.",
    duration: "12 min",
    level: "Intermediate",
    icon: <MdPlayArrow />,
    color: "#8b5cf6",
  },
];

// ── Resources Data ──
const resources = [
  { id: 1, title: "User Manual", icon: <MdDescription />, type: "PDF", size: "2.4 MB" },
  { id: 2, title: "Video Tutorials", icon: <MdVideoLibrary />, type: "Video", size: "45 min" },
  { id: 3, title: "API Documentation", icon: <MdLink />, type: "Online", size: "—" },
  { id: 4, title: "Template Library", icon: <MdDescription />, type: "ZIP", size: "5.1 MB" },
];

// ── Get Started ──
const GetStarted = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Get Started");
  const [completedSteps, setCompletedSteps] = useState([1]);

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

  const handleStepClick = (step) => {
    if (!step.completed) {
      setCompletedSteps([...completedSteps, step.id]);
    }
    navigate(step.link);
  };

  const progressPercentage = Math.round((completedSteps.length / steps.length) * 100);

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
            <h1 className={styles.pageTitle}>Get Started</h1>
            <span className={styles.progressBadge}>{progressPercentage}% Complete</span>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.skipBtn}>Skip Guide</button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {completedSteps.length} of {steps.length} steps completed
          </span>
        </div>

        {/* Steps */}
        <div className={styles.stepsSection}>
          <h2 className={styles.sectionTitle}>
            <MdRocketLaunch className={styles.sectionIcon} />
            Setup Steps
          </h2>
          <div className={styles.stepsList}>
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`${styles.stepItem} ${step.completed || completedSteps.includes(step.id) ? styles.stepCompleted : ''}`}
                onClick={() => handleStepClick(step)}
              >
                <div className={styles.stepNumber} style={{ backgroundColor: step.color }}>
                  {step.completed || completedSteps.includes(step.id) ? (
                    <MdCheckCircle className={styles.stepCheck} />
                  ) : (
                    step.id
                  )}
                </div>
                <div className={styles.stepContent}>
                  <div className={styles.stepHeader}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <span className={styles.stepStatus}>
                      {step.completed || completedSteps.includes(step.id) ? (
                        <span className={styles.statusDone}>✓ Done</span>
                      ) : (
                        <span className={styles.statusPending}>⏳ Pending</span>
                      )}
                    </span>
                  </div>
                  <p className={styles.stepDescription}>{step.description}</p>
                  <button className={styles.stepAction}>
                    {step.completed || completedSteps.includes(step.id) ? 'View' : 'Start'} 
                    <MdArrowForward size={14} />
                  </button>
                </div>
                {index < steps.length - 1 && (
                  <div className={styles.stepConnector} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>
            <MdInsights className={styles.sectionIcon} />
            Key Features
          </h2>
          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <div key={feature.id} className={styles.featureCard}>
                <div className={styles.featureIcon} style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tutorials & Resources */}
        <div className={styles.bottomSection}>
          {/* Tutorials */}
          <div className={styles.tutorialsSection}>
            <h2 className={styles.sectionTitle}>
              <MdSchool className={styles.sectionIcon} />
              Tutorials
            </h2>
            <div className={styles.tutorialsList}>
              {tutorials.map((tutorial) => (
                <div key={tutorial.id} className={styles.tutorialItem}>
                  <div className={styles.tutorialIcon} style={{ backgroundColor: `${tutorial.color}20`, color: tutorial.color }}>
                    {tutorial.icon}
                  </div>
                  <div className={styles.tutorialInfo}>
                    <h4 className={styles.tutorialTitle}>{tutorial.title}</h4>
                    <p className={styles.tutorialDescription}>{tutorial.description}</p>
                    <div className={styles.tutorialMeta}>
                      <span className={styles.tutorialDuration}>
                        <MdTimer size={12} /> {tutorial.duration}
                      </span>
                      <span className={styles.tutorialLevel}>{tutorial.level}</span>
                    </div>
                  </div>
                  <button className={styles.tutorialBtn}>
                    Watch <MdPlayArrow size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className={styles.resourcesSection}>
            <h2 className={styles.sectionTitle}>
              <MdDescription className={styles.sectionIcon} />
              Resources
            </h2>
            <div className={styles.resourcesList}>
              {resources.map((resource) => (
                <div key={resource.id} className={styles.resourceItem}>
                  <div className={styles.resourceIcon}>
                    {resource.icon}
                  </div>
                  <div className={styles.resourceInfo}>
                    <span className={styles.resourceTitle}>{resource.title}</span>
                    <span className={styles.resourceMeta}>
                      {resource.type} • {resource.size}
                    </span>
                  </div>
                  <button className={styles.resourceBtn}>
                    <MdDownload size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaLeft}>
              <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
              <p className={styles.ctaDescription}>
                Complete all the setup steps and start exploring the full potential of your dashboard.
              </p>
            </div>
            <button className={styles.ctaBtn} onClick={() => navigate('/dashboard')}>
              Go to Dashboard <MdArrowForward size={18} />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default GetStarted;