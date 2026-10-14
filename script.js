/**
 * ============================================================================
 * STUDENT PORTFOLIO MANAGEMENT SYSTEM (PortfolioPulse)
 * Complete, vanilla JavaScript application script.
 * Features: LocalStorage persistence, full CRUD operations, profile completion
 * engine, dynamic filtering/search, print-ready preview, and theme switching.
 * ============================================================================
 */

(function () {
  'use strict';

  // --- 1. CONSTANTS & DEFAULT SAMPLE DATA ---
  const STORAGE_KEY = 'spms_portfolio_data_v1';
  const THEME_KEY = 'spms_app_theme';

  const DEFAULT_SAMPLE_DATA = {
    profile: {
      fullName: 'Alexandria Rivera',
      studentId: 'STU-2024-CS0842',
      college: 'Apex Institute of Technology & Sciences',
      department: 'Computer Science & Engineering (B.Tech)',
      year: '3rd Year (6th Semester)',
      email: 'alex.rivera@apex.edu',
      phone: '+1 (555) 234-8901',
      bio: 'Aspiring Full-Stack Software Engineer & Cloud Enthusiast passionate about building scalable web applications, accessible design systems, and intelligent automation tools. Active open-source contributor and university hackathon lead.',
      avatarUrl: 'assets/default-avatar.svg',
      linkedin: 'https://linkedin.com/in/alex-rivera-tech',
      github: 'https://github.com/alexrivera-dev',
      website: 'https://alexrivera.dev'
    },
    academics: [
      {
        id: 'acad_1',
        degree: 'B.Tech in Computer Science & Engineering',
        institution: 'Apex Institute of Technology & Sciences',
        year: '2022 - 2026',
        semester: 'Semester 5',
        score: '9.24 / 10.0',
        scale: 'CGPA (10.0 Scale)',
        achievements: "Dean's Honor List for 4 consecutive terms. Specialization in Distributed Systems & Web Architectures."
      },
      {
        id: 'acad_2',
        degree: "Senior Secondary Certificate (Class XII - PCM)",
        institution: "St. Xavier's Senior Secondary School",
        year: '2020 - 2022',
        semester: 'Class XII',
        score: '95.8%',
        scale: 'Percentage (%)',
        achievements: 'School Topper in Computer Science & Mathematics. Awarded Certificate of Merit in Science Stream.'
      },
      {
        id: 'acad_3',
        degree: "Secondary School Certificate (Class X)",
        institution: "St. Xavier's Senior Secondary School",
        year: '2018 - 2020',
        semester: 'Class X',
        score: '94.2%',
        scale: 'Percentage (%)',
        achievements: 'State Science Olympiad Silver Medalist. Led the School Computer Club.'
      }
    ],
    projects: [
      {
        id: 'proj_1',
        title: 'EcoRoute: AI Green Mobility Planner',
        category: 'Web Application',
        description: 'An intelligent urban transit planner that calculates carbon-optimized routes, integrates public transit APIs, and incentivizes eco-friendly travel through community challenges.',
        techStack: 'HTML5, CSS3, JavaScript, Mapbox API, REST API',
        startDate: '2024-01-15',
        endDate: '2024-04-20',
        status: 'Completed',
        github: 'https://github.com/alexrivera-dev/ecoroute-planner',
        liveDemo: 'https://ecoroute-demo.netlify.app',
        imageUrl: 'assets/project-ecoroute.svg'
      },
      {
        id: 'proj_2',
        title: 'CarePulse: Patient Healthcare Portal',
        category: 'Healthcare Tech',
        description: 'A responsive patient management system with automated SMS appointment reminders, doctor scheduling matrices, and secure digital prescription records.',
        techStack: 'JavaScript ES6+, CSS Grid, Web Storage API, REST APIs',
        startDate: '2024-05-10',
        endDate: '2024-08-15',
        status: 'Completed',
        github: 'https://github.com/alexrivera-dev/carepulse-portal',
        liveDemo: 'https://carepulse-app.vercel.app',
        imageUrl: 'assets/project-carepulse.svg'
      },
      {
        id: 'proj_3',
        title: 'CodeCollab: Markdown Live Studio',
        category: 'Developer Tools',
        description: 'A browser-based Markdown studio featuring live split-screen preview, syntax highlighting, LaTeX math equation rendering, and one-click PDF export.',
        techStack: 'HTML5, CSS3, JavaScript, Regex Parser, Canvas API',
        startDate: '2024-09-01',
        endDate: '2024-11-10',
        status: 'Completed',
        github: 'https://github.com/alexrivera-dev/codecollab-editor',
        liveDemo: 'https://codecollab-studio.pages.dev',
        imageUrl: 'assets/project-codecollab.svg'
      }
    ],
    skills: [
      {
        id: 'skill_1',
        name: 'HTML5 & Semantic Web',
        category: 'Frontend',
        level: 'Expert',
        percentage: 95
      },
      {
        id: 'skill_2',
        name: 'CSS3 & Responsive Design',
        category: 'Frontend',
        level: 'Advanced',
        percentage: 90
      },
      {
        id: 'skill_3',
        name: 'JavaScript (ES6+)',
        category: 'Programming Languages',
        level: 'Advanced',
        percentage: 88
      },
      {
        id: 'skill_4',
        name: 'Python & Data Analysis',
        category: 'Programming Languages',
        level: 'Intermediate',
        percentage: 75
      },
      {
        id: 'skill_5',
        name: 'Git & Version Control',
        category: 'Tools & DevOps',
        level: 'Advanced',
        percentage: 85
      },
      {
        id: 'skill_6',
        name: 'Agile & Team Leadership',
        category: 'Soft Skills',
        level: 'Expert',
        percentage: 92
      }
    ],
    certifications: [
      {
        id: 'cert_1',
        name: 'Meta Front-End Developer Professional Certificate',
        issuer: 'Meta / Coursera',
        issueDate: '2024-03-12',
        expiryDate: '',
        credentialId: 'META-FED-884912',
        verifyUrl: 'https://coursera.org/verify/professional-cert/META-FED-884912'
      },
      {
        id: 'cert_2',
        name: 'AWS Certified Cloud Practitioner (CLF-C02)',
        issuer: 'Amazon Web Services',
        issueDate: '2023-11-20',
        expiryDate: '2026-11-20',
        credentialId: 'AWS-CCP-992104',
        verifyUrl: 'https://aws.amazon.com/verification/AWS-CCP-992104'
      },
      {
        id: 'cert_3',
        name: 'Google Cloud Computing Foundations',
        issuer: 'Google Cloud Training',
        issueDate: '2023-08-15',
        expiryDate: '',
        credentialId: 'GCCF-338190',
        verifyUrl: 'https://cloud.google.com/skillsboost/verify/GCCF-338190'
      }
    ],
    achievements: [
      {
        id: 'achieve_1',
        title: '1st Place Winner - HackGenesis National 36hr Hackathon',
        category: 'Hackathons',
        date: '2024-02-18',
        description: 'Led a team of 4 to design and build EcoRoute out of 120+ participating university teams. Awarded $2,500 grand prize and Best UI/UX award.',
        proofUrl: 'https://hackgenesis2024.devpost.com/submissions'
      },
      {
        id: 'achieve_2',
        title: 'Student Chairperson - ACM Student Chapter',
        category: 'Leadership',
        date: '2023-08-01',
        description: 'Elected student head of university ACM chapter. Organized 8 technical workshops, 2 coding sprints, and mentored 150+ junior engineering students.',
        proofUrl: 'https://apex.edu/acm-chapter/leads'
      }
    ],
    internships: [
      {
        id: 'intern_1',
        company: 'NovaSphere Tech Solutions',
        role: 'Frontend Engineering Intern',
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        description: 'Engineered responsive client dashboards using modular HTML/CSS/JS, optimized page load speeds by 38% through image lazy-loading and asset bundling, and authored 15+ reusable UI components.',
        skillsLearned: 'CSS Grid, JavaScript ES6+, Web Accessibility (a11y), Git Workflows, Performance Profiling',
        proofUrl: 'https://novaspheretech.com/internship-verify/ALEX-2024'
      }
    ],
    activities: [
      {
        id: 'act_1',
        text: 'System loaded with initial demo student portfolio.',
        time: 'Just now',
        icon: '🚀'
      }
    ]
  };

  // --- 2. APPLICATION STATE & STORAGE ENGINE ---
  let appState = loadState();

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all required collections exist
        return {
          profile: { ...DEFAULT_SAMPLE_DATA.profile, ...(parsed.profile || {}) },
          academics: Array.isArray(parsed.academics) ? parsed.academics : DEFAULT_SAMPLE_DATA.academics,
          projects: Array.isArray(parsed.projects) ? parsed.projects : DEFAULT_SAMPLE_DATA.projects,
          skills: Array.isArray(parsed.skills) ? parsed.skills : DEFAULT_SAMPLE_DATA.skills,
          certifications: Array.isArray(parsed.certifications) ? parsed.certifications : DEFAULT_SAMPLE_DATA.certifications,
          achievements: Array.isArray(parsed.achievements) ? parsed.achievements : DEFAULT_SAMPLE_DATA.achievements,
          internships: Array.isArray(parsed.internships) ? parsed.internships : DEFAULT_SAMPLE_DATA.internships,
          activities: Array.isArray(parsed.activities) ? parsed.activities : DEFAULT_SAMPLE_DATA.activities
        };
      }
    } catch (e) {
      console.error('Error loading data from LocalStorage:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_SAMPLE_DATA));
  }

  function saveState(logActivityText = null, logIcon = '📝') {
    if (logActivityText) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      appState.activities.unshift({
        id: 'act_' + Date.now(),
        text: logActivityText,
        time: timeStr,
        icon: logIcon
      });
      if (appState.activities.length > 20) {
        appState.activities.pop();
      }
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.error('Error saving data to LocalStorage:', e);
      showToast('LocalStorage limit exceeded or storage error', 'error');
    }
    renderAll();
  }

  // --- 3. THEME MANAGER ---
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    setTheme(savedTheme);

    const toggleBtns = [
      document.getElementById('landing-theme-toggle'),
      document.getElementById('app-theme-toggle')
    ];

    toggleBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
          const newTheme = currentTheme === 'light' ? 'dark' : 'light';
          setTheme(newTheme);
        });
      }
    });

    const btnLight = document.getElementById('btn-theme-light');
    const btnDark = document.getElementById('btn-theme-dark');
    if (btnLight) btnLight.addEventListener('click', () => setTheme('light'));
    if (btnDark) btnDark.addEventListener('click', () => setTheme('dark'));
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  // --- 4. NAVIGATION & VIEW ROUTING ---
  function initNavigation() {
    // Landing vs App Views
    const landingView = document.getElementById('view-landing');
    const appView = document.getElementById('view-app');

    function showApp(targetSection = 'section-dashboard') {
      landingView.classList.add('hidden');
      appView.classList.remove('hidden');
      switchSection(targetSection);
      window.scrollTo(0, 0);
    }

    function showLanding() {
      appView.classList.add('hidden');
      landingView.classList.remove('hidden');
      window.scrollTo(0, 0);
    }

    // Landing CTAs
    const landingGetStarted = document.getElementById('landing-get-started-btn');
    const heroGetStarted = document.getElementById('hero-get-started');
    const footerLaunch = document.getElementById('footer-launch-btn');
    const landingPreview = document.getElementById('landing-preview-btn');
    const btnReturnLanding = document.getElementById('btn-return-landing');
    const appLogoHome = document.getElementById('app-logo-home');

    if (landingGetStarted) landingGetStarted.addEventListener('click', () => showApp('section-dashboard'));
    if (heroGetStarted) heroGetStarted.addEventListener('click', () => showApp('section-dashboard'));
    if (footerLaunch) footerLaunch.addEventListener('click', () => showApp('section-dashboard'));
    if (landingPreview) landingPreview.addEventListener('click', () => showApp('section-portfolio-preview'));
    if (btnReturnLanding) btnReturnLanding.addEventListener('click', showLanding);
    if (appLogoHome) appLogoHome.addEventListener('click', (e) => { e.preventDefault(); switchSection('section-dashboard'); });

    // Sidebar Navigation Links
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        if (target) {
          switchSection(target);
          closeMobileSidebar();
        }
      });
    });

    // Mobile Sidebar Drawer Toggle
    const mobileMenuBtn = document.getElementById('sidebar-toggle-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    const sidebar = document.getElementById('sidebar');

    function openMobileSidebar() {
      sidebar.classList.add('open');
      sidebarBackdrop.classList.add('show');
    }

    function closeMobileSidebar() {
      sidebar.classList.remove('open');
      sidebarBackdrop.classList.remove('show');
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileSidebar);
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
    if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMobileSidebar);

    // Dashboard Quick Actions & Buttons
    const dashViewPortfolio = document.getElementById('dash-btn-view-portfolio');
    const dashEditProfile = document.getElementById('dash-btn-edit-profile');
    const dashViewAllProjects = document.getElementById('dash-view-all-projects');
    const dashViewAllAcademics = document.getElementById('dash-view-all-academics');
    const topNavProfileBtn = document.getElementById('top-nav-profile-btn');

    if (dashViewPortfolio) dashViewPortfolio.addEventListener('click', () => switchSection('section-portfolio-preview'));
    if (dashEditProfile) dashEditProfile.addEventListener('click', () => switchSection('section-profile'));
    if (dashViewAllProjects) dashViewAllProjects.addEventListener('click', () => switchSection('section-projects'));
    if (dashViewAllAcademics) dashViewAllAcademics.addEventListener('click', () => switchSection('section-academics'));
    if (topNavProfileBtn) topNavProfileBtn.addEventListener('click', () => switchSection('section-profile'));

    // Dashboard Stat Cards click jumps to sections
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      card.addEventListener('click', () => {
        const target = card.getAttribute('data-section');
        if (target) switchSection(`section-${target}`);
      });
    });

    // Quick Add Dropdown Menu
    const quickAddTrigger = document.getElementById('quick-add-trigger');
    const quickAddMenu = document.getElementById('quick-add-menu');

    if (quickAddTrigger && quickAddMenu) {
      quickAddTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        quickAddMenu.classList.toggle('show');
      });

      document.addEventListener('click', () => {
        quickAddMenu.classList.remove('show');
      });

      const quickAddItems = quickAddMenu.querySelectorAll('.dropdown-item');
      quickAddItems.forEach(item => {
        item.addEventListener('click', () => {
          const action = item.getAttribute('data-action');
          handleQuickAction(action);
          quickAddMenu.classList.remove('show');
        });
      });
    }

    // Quick Action Buttons on Dashboard panel
    const qaAddProject = document.getElementById('qa-add-project');
    const qaAddAcademic = document.getElementById('qa-add-academic');
    const qaAddCert = document.getElementById('qa-add-cert');
    const qaAddSkill = document.getElementById('qa-add-skill');

    if (qaAddProject) qaAddProject.addEventListener('click', () => openProjectModal());
    if (qaAddAcademic) qaAddAcademic.addEventListener('click', () => openAcademicModal());
    if (qaAddCert) qaAddCert.addEventListener('click', () => openCertModal());
    if (qaAddSkill) qaAddSkill.addEventListener('click', () => openSkillModal());
  }

  function handleQuickAction(action) {
    switch (action) {
      case 'add-project':
        switchSection('section-projects');
        openProjectModal();
        break;
      case 'add-academic':
        switchSection('section-academics');
        openAcademicModal();
        break;
      case 'add-skill':
        switchSection('section-skills');
        openSkillModal();
        break;
      case 'add-cert':
        switchSection('section-certifications');
        openCertModal();
        break;
      case 'add-achievement':
        switchSection('section-achievements');
        openAchievementModal();
        break;
      case 'add-internship':
        switchSection('section-internships');
        openInternshipModal();
        break;
    }
  }

  function switchSection(targetSectionId) {
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(sec => sec.classList.remove('active'));

    const targetSec = document.getElementById(targetSectionId);
    if (targetSec) {
      targetSec.classList.add('active');
    }

    // Update active state in sidebar nav
    const allLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    allLinks.forEach(link => {
      if (link.getAttribute('data-target') === targetSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Topbar Title
    const titleMap = {
      'section-dashboard': 'Dashboard',
      'section-profile': 'Student Profile',
      'section-academics': 'Academic Records',
      'section-projects': 'Projects Management',
      'section-skills': 'Skills Management',
      'section-certifications': 'Certifications',
      'section-achievements': 'Achievements & Activities',
      'section-internships': 'Internship Experience',
      'section-portfolio-preview': 'Portfolio Preview',
      'section-settings': 'System Settings'
    };

    const topNavTitle = document.getElementById('top-nav-title');
    if (topNavTitle) {
      topNavTitle.textContent = titleMap[targetSectionId] || 'Dashboard';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- 5. DASHBOARD STATS & COMPLETION ENGINE ---
  function calculateProfileCompletion() {
    let score = 0;
    const p = appState.profile;

    // Profile fields weighting (50% max)
    if (p.fullName && p.fullName.trim()) score += 7;
    if (p.studentId && p.studentId.trim()) score += 5;
    if (p.college && p.college.trim()) score += 5;
    if (p.department && p.department.trim()) score += 5;
    if (p.year && p.year.trim()) score += 4;
    if (p.email && p.email.trim()) score += 6;
    if (p.phone && p.phone.trim()) score += 4;
    if (p.bio && p.bio.trim().length > 20) score += 8;
    if (p.avatarUrl && p.avatarUrl !== 'assets/default-avatar.svg') score += 6;

    // Collections weighting (50% max)
    if (appState.academics.length >= 1) score += 10;
    if (appState.projects.length >= 1) score += 15;
    if (appState.skills.length >= 3) score += 10;
    if (appState.certifications.length >= 1) score += 8;
    if (appState.achievements.length >= 1) score += 4;
    if (appState.internships.length >= 1) score += 3;

    return Math.min(100, Math.round(score));
  }

  function renderDashboard() {
    const p = appState.profile;
    const completion = calculateProfileCompletion();

    // Welcome banner text
    const dashStudentName = document.getElementById('dash-student-name');
    const dashStudentTagline = document.getElementById('dash-student-tagline');
    const dashCompletionPercent = document.getElementById('dash-completion-percent');
    const dashRadialFill = document.getElementById('dash-radial-fill');

    if (dashStudentName) dashStudentName.textContent = p.fullName.split(' ')[0] || 'Student';
    if (dashStudentTagline) {
      dashStudentTagline.innerHTML = `Your portfolio is <strong>${completion}% complete</strong>. Keep adding your latest projects and certifications to stand out to campus recruiters.`;
    }
    if (dashCompletionPercent) dashCompletionPercent.textContent = `${completion}%`;

    // Radial SVG gauge (circumference = 2 * PI * 50 = 314.159)
    if (dashRadialFill) {
      const circ = 2 * Math.PI * 50;
      const offset = circ - (completion / 100) * circ;
      dashRadialFill.style.strokeDashoffset = offset;
    }

    // Stat Counters
    const statProjects = document.getElementById('stat-projects-count');
    const statCerts = document.getElementById('stat-certs-count');
    const statSkills = document.getElementById('stat-skills-count');
    const statAchievements = document.getElementById('stat-achievements-count');

    if (statProjects) statProjects.textContent = appState.projects.length;
    if (statCerts) statCerts.textContent = appState.certifications.length;
    if (statSkills) statSkills.textContent = appState.skills.length;
    if (statAchievements) statAchievements.textContent = appState.achievements.length;

    // Sidebar Badges
    const badgeAcademics = document.getElementById('badge-academics-count');
    const badgeProjects = document.getElementById('badge-projects-count');
    const badgeSkills = document.getElementById('badge-skills-count');
    const badgeCerts = document.getElementById('badge-certs-count');
    const badgeAchievements = document.getElementById('badge-achievements-count');
    const badgeInternships = document.getElementById('badge-internships-count');

    if (badgeAcademics) badgeAcademics.textContent = appState.academics.length;
    if (badgeProjects) badgeProjects.textContent = appState.projects.length;
    if (badgeSkills) badgeSkills.textContent = appState.skills.length;
    if (badgeCerts) badgeCerts.textContent = appState.certifications.length;
    if (badgeAchievements) badgeAchievements.textContent = appState.achievements.length;
    if (badgeInternships) badgeInternships.textContent = appState.internships.length;

    // Render Recent Projects in Dashboard
    const recentProjectsContainer = document.getElementById('dash-recent-projects');
    if (recentProjectsContainer) {
      if (appState.projects.length === 0) {
        recentProjectsContainer.innerHTML = '<p class="text-muted" style="font-size:0.88rem;">No projects added yet. Click "+ Add Project" to showcase your work.</p>';
      } else {
        const topProjects = appState.projects.slice(0, 3);
        recentProjectsContainer.innerHTML = topProjects.map(proj => `
          <div class="dash-project-item">
            <div class="dash-proj-info">
              <span class="dash-proj-name">${escapeHtml(proj.title)}</span>
              <span class="dash-proj-meta">${escapeHtml(proj.category)} · ${escapeHtml(proj.status)}</span>
            </div>
            <button class="btn btn-outline btn-xs" onclick="window.viewProjectDetails('${proj.id}')">View</button>
          </div>
        `).join('');
      }
    }

    // Render Academic Snapshot in Dashboard
    const academicListContainer = document.getElementById('dash-academic-list');
    if (academicListContainer) {
      if (appState.academics.length === 0) {
        academicListContainer.innerHTML = '<p class="text-muted" style="font-size:0.88rem;">No academic records logged yet.</p>';
      } else {
        const topAcad = appState.academics.slice(0, 3);
        academicListContainer.innerHTML = topAcad.map(acad => `
          <div class="dash-acad-item">
            <div>
              <div style="font-weight:700; font-size:0.92rem;">${escapeHtml(acad.degree)}</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">${escapeHtml(acad.institution)} (${escapeHtml(acad.semester)})</div>
            </div>
            <div class="dash-acad-score">${escapeHtml(acad.score)}</div>
          </div>
        `).join('');
      }
    }

    // Render Activity Timeline
    const activityTimelineContainer = document.getElementById('dash-activity-timeline');
    if (activityTimelineContainer) {
      if (appState.activities.length === 0) {
        activityTimelineContainer.innerHTML = '<p class="text-muted" style="font-size:0.85rem;">No recent activities logged.</p>';
      } else {
        activityTimelineContainer.innerHTML = appState.activities.map(act => `
          <div class="activity-node">
            <div class="act-icon">${act.icon || '📌'}</div>
            <div class="act-text">
              <div>${escapeHtml(act.text)}</div>
              <div class="act-time">${escapeHtml(act.time)}</div>
            </div>
          </div>
        `).join('');
      }
    }

    // Clear Activity Log Button
    const clearLogBtn = document.getElementById('clear-activity-log-btn');
    if (clearLogBtn) {
      clearLogBtn.onclick = () => {
        appState.activities = [];
        saveState();
        showToast('Activity history cleared', 'info');
      };
    }
  }

  // --- 6. STUDENT PROFILE MANAGEMENT ---
  function initProfileSection() {
    const form = document.getElementById('form-student-profile');
    const avatarInput = document.getElementById('profile-avatar-file-input');
    const btnResetAvatar = document.getElementById('btn-reset-avatar');
    const btnDiscard = document.getElementById('btn-discard-profile');

    // Populate form with current state
    populateProfileForm();

    // Form Submit
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateProfileForm()) return;

        appState.profile.fullName = document.getElementById('prof-fullname').value.trim();
        appState.profile.studentId = document.getElementById('prof-studentid').value.trim();
        appState.profile.college = document.getElementById('prof-college').value.trim();
        appState.profile.department = document.getElementById('prof-department').value.trim();
        appState.profile.year = document.getElementById('prof-year').value.trim();
        appState.profile.email = document.getElementById('prof-email').value.trim();
        appState.profile.phone = document.getElementById('prof-phone').value.trim();
        appState.profile.bio = document.getElementById('prof-bio').value.trim();
        appState.profile.linkedin = document.getElementById('prof-linkedin').value.trim();
        appState.profile.github = document.getElementById('prof-github').value.trim();
        appState.profile.website = document.getElementById('prof-website').value.trim();

        saveState(`Updated profile information for ${appState.profile.fullName}`, '👤');
        showToast('Profile information saved successfully!', 'success');
      });
    }

    if (btnDiscard) {
      btnDiscard.addEventListener('click', () => {
        populateProfileForm();
        showToast('Discarded unsaved profile changes', 'info');
      });
    }

    // Profile Picture File Upload
    if (avatarInput) {
      avatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          if (!file.type.startsWith('image/')) {
            showToast('Please select a valid image file', 'error');
            return;
          }
          if (file.size > 2 * 1024 * 1024) {
            showToast('Image size should be less than 2MB', 'error');
            return;
          }
          const reader = new FileReader();
          reader.onload = function (evt) {
            appState.profile.avatarUrl = evt.target.result;
            saveState('Updated student profile picture', '🖼️');
            showToast('Profile picture updated successfully!', 'success');
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Reset to Default Avatar
    if (btnResetAvatar) {
      btnResetAvatar.addEventListener('click', () => {
        appState.profile.avatarUrl = 'assets/default-avatar.svg';
        saveState('Reset avatar to default icon', '🔄');
        showToast('Reset avatar to default', 'info');
      });
    }
  }

  function populateProfileForm() {
    const p = appState.profile;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('prof-fullname', p.fullName);
    setVal('prof-studentid', p.studentId);
    setVal('prof-college', p.college);
    setVal('prof-department', p.department);
    setVal('prof-year', p.year);
    setVal('prof-email', p.email);
    setVal('prof-phone', p.phone);
    setVal('prof-bio', p.bio);
    setVal('prof-linkedin', p.linkedin);
    setVal('prof-github', p.github);
    setVal('prof-website', p.website);
  }

  function validateProfileForm() {
    let isValid = true;

    function checkField(id, errorId, errorMsg, customRegex = null) {
      const field = document.getElementById(id);
      const err = document.getElementById(errorId);
      if (!field || !err) return true;

      const val = field.value.trim();
      let hasError = false;

      if (!val) {
        hasError = true;
      } else if (customRegex && !customRegex.test(val)) {
        hasError = true;
      }

      if (hasError) {
        err.textContent = errorMsg;
        err.classList.add('show');
        isValid = false;
      } else {
        err.textContent = '';
        err.classList.remove('show');
      }
    }

    checkField('prof-fullname', 'err-prof-fullname', 'Full name is required');
    checkField('prof-studentid', 'err-prof-studentid', 'Student ID is required');
    checkField('prof-college', 'err-prof-college', 'College name is required');
    checkField('prof-department', 'err-prof-department', 'Department is required');
    checkField('prof-year', 'err-prof-year', 'Year/Semester is required');
    checkField('prof-email', 'err-prof-email', 'Enter a valid email address', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    checkField('prof-phone', 'err-prof-phone', 'Enter a valid phone number');
    checkField('prof-bio', 'err-prof-bio', 'Bio / Career objective is required');

    return isValid;
  }

  function renderProfile() {
    const p = appState.profile;

    // Top Bar User info
    const topNavAvatar = document.getElementById('top-nav-avatar');
    const topNavUsername = document.getElementById('top-nav-username');
    if (topNavAvatar) topNavAvatar.src = p.avatarUrl || 'assets/default-avatar.svg';
    if (topNavUsername) topNavUsername.textContent = p.fullName || 'Student';

    // Sidebar User card
    const sidebarAvatar = document.getElementById('sidebar-avatar');
    const sidebarName = document.getElementById('sidebar-user-name');
    const sidebarDept = document.getElementById('sidebar-user-dept');
    if (sidebarAvatar) sidebarAvatar.src = p.avatarUrl || 'assets/default-avatar.svg';
    if (sidebarName) sidebarName.textContent = p.fullName || 'Student';
    if (sidebarDept) sidebarDept.textContent = p.department || '';

    // Profile Section Preview Card
    const profAvatar = document.getElementById('profile-display-avatar');
    const profName = document.getElementById('profile-preview-name');
    const profRole = document.getElementById('profile-preview-role');
    const profId = document.getElementById('profile-preview-id');
    const previewEmail = document.getElementById('preview-text-email');
    const previewPhone = document.getElementById('preview-text-phone');
    const previewCollege = document.getElementById('preview-text-college');

    if (profAvatar) profAvatar.src = p.avatarUrl || 'assets/default-avatar.svg';
    if (profName) profName.textContent = p.fullName;
    if (profRole) profRole.textContent = p.department;
    if (profId) profId.textContent = `ID: ${p.studentId}`;
    if (previewEmail) previewEmail.textContent = p.email;
    if (previewPhone) previewPhone.textContent = p.phone;
    if (previewCollege) previewCollege.textContent = p.college;

    // Social Links in Profile Preview
    const linkLinkedin = document.getElementById('preview-social-linkedin');
    const linkGithub = document.getElementById('preview-social-github');
    const linkWebsite = document.getElementById('preview-social-website');

    if (linkLinkedin) linkLinkedin.href = p.linkedin || '#';
    if (linkGithub) linkGithub.href = p.github || '#';
    if (linkWebsite) linkWebsite.href = p.website || '#';
  }

  // --- 7. ACADEMIC RECORDS MANAGEMENT ---
  function initAcademicsSection() {
    const btnOpenModal = document.getElementById('btn-open-academic-modal');
    if (btnOpenModal) btnOpenModal.addEventListener('click', () => openAcademicModal());

    const form = document.getElementById('form-academic');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveAcademicRecord();
      });
    }
  }

  function openAcademicModal(editId = null) {
    const form = document.getElementById('form-academic');
    form.reset();
    document.getElementById('acad-edit-id').value = editId || '';
    document.getElementById('modal-academic-title').textContent = editId ? 'Edit Academic Record' : 'Add Academic Record';

    if (editId) {
      const record = appState.academics.find(a => a.id === editId);
      if (record) {
        document.getElementById('acad-degree').value = record.degree;
        document.getElementById('acad-institution').value = record.institution;
        document.getElementById('acad-year').value = record.year;
        document.getElementById('acad-semester').value = record.semester;
        document.getElementById('acad-score').value = record.score;
        document.getElementById('acad-scale').value = record.scale || 'CGPA (10.0 Scale)';
        document.getElementById('acad-achievements').value = record.achievements || '';
      }
    }
    openModal('modal-academic');
  }

  function saveAcademicRecord() {
    const editId = document.getElementById('acad-edit-id').value;
    const degree = document.getElementById('acad-degree').value.trim();
    const institution = document.getElementById('acad-institution').value.trim();
    const year = document.getElementById('acad-year').value.trim();
    const semester = document.getElementById('acad-semester').value.trim();
    const score = document.getElementById('acad-score').value.trim();
    const scale = document.getElementById('acad-scale').value;
    const achievements = document.getElementById('acad-achievements').value.trim();

    if (!degree || !institution || !score) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    if (editId) {
      const index = appState.academics.findIndex(a => a.id === editId);
      if (index !== -1) {
        appState.academics[index] = {
          ...appState.academics[index],
          degree, institution, year, semester, score, scale, achievements
        };
        saveState(`Updated academic record: ${degree}`, '🎓');
        showToast('Academic record updated successfully!', 'success');
      }
    } else {
      const newRecord = {
        id: 'acad_' + Date.now(),
        degree, institution, year, semester, score, scale, achievements
      };
      appState.academics.unshift(newRecord);
      saveState(`Added academic record: ${degree}`, '🎓');
      showToast('Academic record added successfully!', 'success');
    }

    closeModal('modal-academic');
  }

  function deleteAcademicRecord(id) {
    const record = appState.academics.find(a => a.id === id);
    const title = record ? record.degree : 'this record';
    showConfirmDialog(
      'Delete Academic Record',
      `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      () => {
        appState.academics = appState.academics.filter(a => a.id !== id);
        saveState(`Deleted academic record: ${title}`, '🗑️');
        showToast('Academic record deleted', 'info');
      }
    );
  }

  function renderAcademics() {
    const container = document.getElementById('academics-container');
    const degreePill = document.getElementById('acad-current-degree');
    const avgGpaPill = document.getElementById('acad-avg-gpa');
    const totalEntriesPill = document.getElementById('acad-total-entries');

    if (totalEntriesPill) totalEntriesPill.textContent = `${appState.academics.length} Records`;
    if (appState.academics.length > 0) {
      if (degreePill) degreePill.textContent = appState.academics[0].degree;
      if (avgGpaPill) avgGpaPill.textContent = appState.academics[0].score;
    } else {
      if (degreePill) degreePill.textContent = 'None';
      if (avgGpaPill) avgGpaPill.textContent = 'N/A';
    }

    if (!container) return;

    if (appState.academics.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon">🎓</div>
          <h3 class="empty-state-title">No Academic Records Logged</h3>
          <p class="empty-state-desc">Record your degrees, semesters, GPA scores, and academic milestones here.</p>
          <button class="btn btn-primary btn-sm" onclick="window.openAcademicModal()">+ Add Academic Record</button>
        </div>
      `;
      return;
    }

    container.innerHTML = appState.academics.map(acad => `
      <div class="academic-card">
        <div>
          <div class="acad-card-top">
            <span class="badge-status-pill">${escapeHtml(acad.semester)}</span>
            <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">${escapeHtml(acad.year)}</span>
          </div>
          <h3 class="acad-degree-title">${escapeHtml(acad.degree)}</h3>
          <p class="acad-institution">🏛️ ${escapeHtml(acad.institution)}</p>
          <div class="acad-score-badge">${escapeHtml(acad.score)} <span style="font-size:0.75rem; font-weight:600; color:var(--text-muted);">(${escapeHtml(acad.scale || 'Score')})</span></div>
          ${acad.achievements ? `<p class="acad-achieve-text">⭐ ${escapeHtml(acad.achievements)}</p>` : ''}
        </div>
        <div class="card-actions-row">
          <button class="btn btn-outline btn-xs" onclick="window.openAcademicModal('${acad.id}')">Edit</button>
          <button class="btn btn-danger btn-xs" onclick="window.deleteAcademicRecord('${acad.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  }

  // --- 8. PROJECTS MANAGEMENT ---
  function initProjectsSection() {
    const btnOpenModal = document.getElementById('btn-open-project-modal');
    if (btnOpenModal) btnOpenModal.addEventListener('click', () => openProjectModal());

    const searchInput = document.getElementById('project-search-input');
    const categoryFilter = document.getElementById('project-category-filter');
    const statusFilter = document.getElementById('project-status-filter');

    if (searchInput) searchInput.addEventListener('input', renderProjects);
    if (categoryFilter) categoryFilter.addEventListener('change', renderProjects);
    if (statusFilter) statusFilter.addEventListener('change', renderProjects);

    const form = document.getElementById('form-project');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProjectRecord();
      });
    }
  }

  function openProjectModal(editId = null) {
    const form = document.getElementById('form-project');
    form.reset();
    document.getElementById('proj-edit-id').value = editId || '';
    document.getElementById('modal-project-title').textContent = editId ? 'Edit Project' : 'Add New Project';

    if (editId) {
      const p = appState.projects.find(item => item.id === editId);
      if (p) {
        document.getElementById('proj-title').value = p.title;
        document.getElementById('proj-category').value = p.category;
        document.getElementById('proj-description').value = p.description;
        document.getElementById('proj-tech').value = p.techStack;
        document.getElementById('proj-start-date').value = p.startDate || '';
        document.getElementById('proj-end-date').value = p.endDate || '';
        document.getElementById('proj-status').value = p.status || 'Completed';
        document.getElementById('proj-github').value = p.github || '';
        document.getElementById('proj-live').value = p.liveDemo || '';
        document.getElementById('proj-image-url').value = p.imageUrl || '';
      }
    }
    openModal('modal-project');
  }

  function saveProjectRecord() {
    const editId = document.getElementById('proj-edit-id').value;
    const title = document.getElementById('proj-title').value.trim();
    const category = document.getElementById('proj-category').value;
    const description = document.getElementById('proj-description').value.trim();
    const techStack = document.getElementById('proj-tech').value.trim();
    const startDate = document.getElementById('proj-start-date').value;
    const endDate = document.getElementById('proj-end-date').value;
    const status = document.getElementById('proj-status').value;
    const github = document.getElementById('proj-github').value.trim();
    const liveDemo = document.getElementById('proj-live').value.trim();
    let imageUrl = document.getElementById('proj-image-url').value.trim();

    if (!title || !description || !techStack) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    if (!imageUrl) {
      imageUrl = 'assets/project-ecoroute.svg';
    }

    if (editId) {
      const index = appState.projects.findIndex(item => item.id === editId);
      if (index !== -1) {
        appState.projects[index] = {
          ...appState.projects[index],
          title, category, description, techStack, startDate, endDate, status, github, liveDemo, imageUrl
        };
        saveState(`Updated project: ${title}`, '🚀');
        showToast('Project updated successfully!', 'success');
      }
    } else {
      const newProj = {
        id: 'proj_' + Date.now(),
        title, category, description, techStack, startDate, endDate, status, github, liveDemo, imageUrl
      };
      appState.projects.unshift(newProj);
      saveState(`Added project: ${title}`, '🚀');
      showToast('Project added successfully!', 'success');
    }

    closeModal('modal-project');
  }

  function deleteProjectRecord(id) {
    const project = appState.projects.find(p => p.id === id);
    const title = project ? project.title : 'this project';
    showConfirmDialog(
      'Delete Project',
      `Are you sure you want to delete "${title}"? This cannot be undone.`,
      () => {
        appState.projects = appState.projects.filter(p => p.id !== id);
        saveState(`Deleted project: ${title}`, '🗑️');
        showToast('Project removed', 'info');
      }
    );
  }

  function viewProjectDetails(id) {
    const p = appState.projects.find(item => item.id === id);
    if (!p) return;

    document.getElementById('detail-proj-heading').textContent = p.title;
    document.getElementById('detail-proj-cat').textContent = p.category;
    document.getElementById('detail-proj-status').textContent = p.status;
    document.getElementById('detail-proj-timeline').textContent = `${p.startDate || 'Started'} — ${p.endDate || 'Present'}`;
    document.getElementById('detail-proj-desc').textContent = p.description;

    const img = document.getElementById('detail-proj-img');
    if (img) img.src = p.imageUrl || 'assets/project-ecoroute.svg';

    // Tags
    const techsContainer = document.getElementById('detail-proj-techs');
    if (techsContainer) {
      const tags = p.techStack.split(',').map(t => t.trim()).filter(Boolean);
      techsContainer.innerHTML = tags.map(tag => `<span class="tech-tag">${escapeHtml(tag)}</span>`).join('');
    }

    // Links
    const linksContainer = document.getElementById('detail-proj-links');
    if (linksContainer) {
      let linksHtml = '';
      if (p.liveDemo) {
        linksHtml += `<a href="${escapeHtml(p.liveDemo)}" target="_blank" class="btn btn-primary btn-sm">🔗 Open Live Demo</a> `;
      }
      if (p.github) {
        linksHtml += `<a href="${escapeHtml(p.github)}" target="_blank" class="btn btn-secondary btn-sm">💻 View GitHub Repo</a>`;
      }
      linksContainer.innerHTML = linksHtml || '<span class="text-muted" style="font-size:0.85rem;">No external links provided.</span>';
    }

    openModal('modal-project-details');
  }

  function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const searchTerm = (document.getElementById('project-search-input')?.value || '').toLowerCase().trim();
    const catFilter = document.getElementById('project-category-filter')?.value || 'all';
    const statusFilter = document.getElementById('project-status-filter')?.value || 'all';

    let filtered = appState.projects.filter(proj => {
      const matchesSearch = !searchTerm ||
        proj.title.toLowerCase().includes(searchTerm) ||
        proj.description.toLowerCase().includes(searchTerm) ||
        proj.techStack.toLowerCase().includes(searchTerm);

      const matchesCat = catFilter === 'all' || proj.category === catFilter;
      const matchesStatus = statusFilter === 'all' || proj.status === statusFilter;

      return matchesSearch && matchesCat && matchesStatus;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon">📂</div>
          <h3 class="empty-state-title">No Projects Found</h3>
          <p class="empty-state-desc">Try clearing your search query or filters, or add a new project.</p>
          <button class="btn btn-primary btn-sm" onclick="window.openProjectModal()">+ Add Project</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(p => {
      const tags = p.techStack.split(',').map(t => t.trim()).filter(Boolean).slice(0, 4);
      return `
        <div class="project-card">
          <div class="project-thumb-wrap">
            <img src="${escapeHtml(p.imageUrl || 'assets/project-ecoroute.svg')}" alt="${escapeHtml(p.title)}" class="project-thumb-img" onerror="this.src='assets/project-ecoroute.svg'">
            <span class="badge-status-pill project-status-tag ${p.status === 'Completed' ? 'badge-pill-green' : 'badge-pill-amber'}">${escapeHtml(p.status)}</span>
          </div>
          <div class="project-body">
            <span class="project-cat-pill">${escapeHtml(p.category)}</span>
            <h3 class="project-title">${escapeHtml(p.title)}</h3>
            <p class="project-desc-clamp">${escapeHtml(p.description)}</p>
            <div class="tags-container mt-2">
              ${tags.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
            </div>
            <div class="project-footer">
              <div class="project-links">
                ${p.github ? `<a href="${escapeHtml(p.github)}" target="_blank" class="icon-btn" title="GitHub"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>` : ''}
                ${p.liveDemo ? `<a href="${escapeHtml(p.liveDemo)}" target="_blank" class="icon-btn" title="Live Demo"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg></a>` : ''}
              </div>
              <div style="display:flex; gap:0.4rem;">
                <button class="btn btn-outline btn-xs" onclick="window.viewProjectDetails('${p.id}')">Details</button>
                <button class="btn btn-secondary btn-xs" onclick="window.openProjectModal('${p.id}')">Edit</button>
                <button class="btn btn-danger btn-xs" onclick="window.deleteProjectRecord('${p.id}')">Delete</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- 9. SKILLS MANAGEMENT ---
  function initSkillsSection() {
    const btnOpenModal = document.getElementById('btn-open-skill-modal');
    if (btnOpenModal) btnOpenModal.addEventListener('click', () => openSkillModal());

    const rangeSlider = document.getElementById('skill-percentage');
    const rangeVal = document.getElementById('skill-percentage-val');
    const levelSelect = document.getElementById('skill-level');

    if (rangeSlider && rangeVal) {
      rangeSlider.addEventListener('input', () => {
        rangeVal.textContent = `${rangeSlider.value}%`;
      });
    }

    if (levelSelect && rangeSlider && rangeVal) {
      levelSelect.addEventListener('change', () => {
        const defaults = { Beginner: 35, Intermediate: 60, Advanced: 85, Expert: 95 };
        const val = defaults[levelSelect.value] || 80;
        rangeSlider.value = val;
        rangeVal.textContent = `${val}%`;
      });
    }

    // Category Tabs
    const tabs = document.querySelectorAll('#skill-category-tabs .pill-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderSkills();
      });
    });

    const form = document.getElementById('form-skill');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveSkillRecord();
      });
    }
  }

  function openSkillModal(editId = null) {
    const form = document.getElementById('form-skill');
    form.reset();
    document.getElementById('skill-edit-id').value = editId || '';
    document.getElementById('modal-skill-title').textContent = editId ? 'Edit Skill' : 'Add New Skill';

    if (editId) {
      const s = appState.skills.find(item => item.id === editId);
      if (s) {
        document.getElementById('skill-name').value = s.name;
        document.getElementById('skill-category').value = s.category;
        document.getElementById('skill-level').value = s.level;
        document.getElementById('skill-percentage').value = s.percentage || 80;
        document.getElementById('skill-percentage-val').textContent = `${s.percentage || 80}%`;
      }
    } else {
      document.getElementById('skill-percentage').value = 85;
      document.getElementById('skill-percentage-val').textContent = '85%';
    }
    openModal('modal-skill');
  }

  function saveSkillRecord() {
    const editId = document.getElementById('skill-edit-id').value;
    const name = document.getElementById('skill-name').value.trim();
    const category = document.getElementById('skill-category').value;
    const level = document.getElementById('skill-level').value;
    const percentage = parseInt(document.getElementById('skill-percentage').value, 10) || 80;

    if (!name) {
      showToast('Skill name is required', 'error');
      return;
    }

    if (editId) {
      const index = appState.skills.findIndex(item => item.id === editId);
      if (index !== -1) {
        appState.skills[index] = { ...appState.skills[index], name, category, level, percentage };
        saveState(`Updated skill: ${name}`, '⭐');
        showToast('Skill updated successfully!', 'success');
      }
    } else {
      const newSkill = { id: 'skill_' + Date.now(), name, category, level, percentage };
      appState.skills.push(newSkill);
      saveState(`Added skill: ${name}`, '⭐');
      showToast('Skill added successfully!', 'success');
    }

    closeModal('modal-skill');
  }

  function deleteSkillRecord(id) {
    const s = appState.skills.find(item => item.id === id);
    const title = s ? s.name : 'this skill';
    showConfirmDialog('Delete Skill', `Are you sure you want to remove "${title}"?`, () => {
      appState.skills = appState.skills.filter(item => item.id !== id);
      saveState(`Removed skill: ${title}`, '🗑️');
      showToast('Skill removed', 'info');
    });
  }

  function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    const activeTab = document.querySelector('#skill-category-tabs .pill-tab.active');
    const selectedCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';

    let filtered = appState.skills;
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon">⭐</div>
          <h3 class="empty-state-title">No Skills in this Category</h3>
          <p class="empty-state-desc">Add technical tools, frameworks, and interpersonal skills to showcase your talent.</p>
          <button class="btn btn-primary btn-sm" onclick="window.openSkillModal()">+ Add Skill</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(s => `
      <div class="skill-card">
        <div class="skill-header">
          <span class="skill-name">${escapeHtml(s.name)}</span>
          <span class="skill-level-badge badge-status-pill">${escapeHtml(s.level)}</span>
        </div>
        <div class="skill-progress-bar">
          <div class="skill-progress-fill" style="width: ${s.percentage}%"></div>
        </div>
        <div class="skill-card-bottom">
          <span>${escapeHtml(s.category)} · ${s.percentage}%</span>
          <div style="display:flex; gap:0.35rem;">
            <button class="btn btn-ghost btn-xs" onclick="window.openSkillModal('${s.id}')">Edit</button>
            <button class="btn btn-ghost btn-xs text-danger" onclick="window.deleteSkillRecord('${s.id}')">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- 10. CERTIFICATIONS MANAGEMENT ---
  function initCertificationsSection() {
    const btnOpenModal = document.getElementById('btn-open-cert-modal');
    if (btnOpenModal) btnOpenModal.addEventListener('click', () => openCertModal());

    const form = document.getElementById('form-cert');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveCertRecord();
      });
    }
  }

  function openCertModal(editId = null) {
    const form = document.getElementById('form-cert');
    form.reset();
    document.getElementById('cert-edit-id').value = editId || '';
    document.getElementById('modal-cert-title').textContent = editId ? 'Edit Certification' : 'Add Certification';

    if (editId) {
      const c = appState.certifications.find(item => item.id === editId);
      if (c) {
        document.getElementById('cert-name').value = c.name;
        document.getElementById('cert-issuer').value = c.issuer;
        document.getElementById('cert-issue-date').value = c.issueDate || '';
        document.getElementById('cert-expiry-date').value = c.expiryDate || '';
        document.getElementById('cert-credential-id').value = c.credentialId || '';
        document.getElementById('cert-verify-url').value = c.verifyUrl || '';
      }
    }
    openModal('modal-cert');
  }

  function saveCertRecord() {
    const editId = document.getElementById('cert-edit-id').value;
    const name = document.getElementById('cert-name').value.trim();
    const issuer = document.getElementById('cert-issuer').value.trim();
    const issueDate = document.getElementById('cert-issue-date').value;
    const expiryDate = document.getElementById('cert-expiry-date').value;
    const credentialId = document.getElementById('cert-credential-id').value.trim();
    const verifyUrl = document.getElementById('cert-verify-url').value.trim();

    if (!name || !issuer) {
      showToast('Please provide certificate name and issuing organization', 'error');
      return;
    }

    if (editId) {
      const index = appState.certifications.findIndex(item => item.id === editId);
      if (index !== -1) {
        appState.certifications[index] = {
          ...appState.certifications[index],
          name, issuer, issueDate, expiryDate, credentialId, verifyUrl
        };
        saveState(`Updated certification: ${name}`, '📜');
        showToast('Certification updated successfully!', 'success');
      }
    } else {
      const newCert = {
        id: 'cert_' + Date.now(),
        name, issuer, issueDate, expiryDate, credentialId, verifyUrl
      };
      appState.certifications.unshift(newCert);
      saveState(`Added certification: ${name}`, '📜');
      showToast('Certification added successfully!', 'success');
    }

    closeModal('modal-cert');
  }

  function deleteCertRecord(id) {
    const c = appState.certifications.find(item => item.id === id);
    const title = c ? c.name : 'this certification';
    showConfirmDialog('Delete Certification', `Are you sure you want to delete "${title}"?`, () => {
      appState.certifications = appState.certifications.filter(item => item.id !== id);
      saveState(`Deleted certification: ${title}`, '🗑️');
      showToast('Certification deleted', 'info');
    });
  }

  function renderCertifications() {
    const container = document.getElementById('certifications-container');
    if (!container) return;

    if (appState.certifications.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon">📜</div>
          <h3 class="empty-state-title">No Certifications Logged</h3>
          <p class="empty-state-desc">Add cloud certifications, online degrees, vendor badges, and licensed credentials.</p>
          <button class="btn btn-primary btn-sm" onclick="window.openCertModal()">+ Add Certification</button>
        </div>
      `;
      return;
    }

    container.innerHTML = appState.certifications.map(c => `
      <div class="cert-card">
        <div class="cert-badge-strip">
          <img src="assets/cert-badge.svg" alt="Badge" class="cert-badge-img">
          <div>
            <h3 class="cert-name">${escapeHtml(c.name)}</h3>
            <p class="cert-issuer">${escapeHtml(c.issuer)}</p>
          </div>
        </div>
        <div class="cert-meta-details">
          <div><strong>Issued:</strong> ${escapeHtml(c.issueDate || 'N/A')}</div>
          <div><strong>Expires:</strong> ${escapeHtml(c.expiryDate || 'No Expiration')}</div>
          ${c.credentialId ? `<div><strong>ID:</strong> <code class="cert-cred-id">${escapeHtml(c.credentialId)}</code></div>` : ''}
        </div>
        <div class="card-actions-row">
          ${c.verifyUrl ? `<a href="${escapeHtml(c.verifyUrl)}" target="_blank" class="btn btn-outline btn-xs" style="margin-right:auto;">Verify Online ↗</a>` : ''}
          <button class="btn btn-secondary btn-xs" onclick="window.openCertModal('${c.id}')">Edit</button>
          <button class="btn btn-danger btn-xs" onclick="window.deleteCertRecord('${c.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  }

  // --- 11. ACHIEVEMENTS & EXTRACURRICULAR ---
  function initAchievementsSection() {
    const btnOpenModal = document.getElementById('btn-open-achievement-modal');
    if (btnOpenModal) btnOpenModal.addEventListener('click', () => openAchievementModal());

    const tabs = document.querySelectorAll('#achievement-category-tabs .pill-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderAchievements();
      });
    });

    const form = document.getElementById('form-achievement');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveAchievementRecord();
      });
    }
  }

  function openAchievementModal(editId = null) {
    const form = document.getElementById('form-achievement');
    form.reset();
    document.getElementById('achieve-edit-id').value = editId || '';
    document.getElementById('modal-achievement-title').textContent = editId ? 'Edit Achievement' : 'Add Achievement / Activity';

    if (editId) {
      const a = appState.achievements.find(item => item.id === editId);
      if (a) {
        document.getElementById('achieve-title').value = a.title;
        document.getElementById('achieve-category').value = a.category;
        document.getElementById('achieve-date').value = a.date || '';
        document.getElementById('achieve-desc').value = a.description;
        document.getElementById('achieve-proof').value = a.proofUrl || '';
      }
    }
    openModal('modal-achievement');
  }

  function saveAchievementRecord() {
    const editId = document.getElementById('achieve-edit-id').value;
    const title = document.getElementById('achieve-title').value.trim();
    const category = document.getElementById('achieve-category').value;
    const date = document.getElementById('achieve-date').value;
    const description = document.getElementById('achieve-desc').value.trim();
    const proofUrl = document.getElementById('achieve-proof').value.trim();

    if (!title || !description) {
      showToast('Please provide achievement title and description', 'error');
      return;
    }

    if (editId) {
      const index = appState.achievements.findIndex(item => item.id === editId);
      if (index !== -1) {
        appState.achievements[index] = {
          ...appState.achievements[index],
          title, category, date, description, proofUrl
        };
        saveState(`Updated achievement: ${title}`, '🏆');
        showToast('Achievement updated successfully!', 'success');
      }
    } else {
      const newAchieve = {
        id: 'achieve_' + Date.now(),
        title, category, date, description, proofUrl
      };
      appState.achievements.unshift(newAchieve);
      saveState(`Recorded achievement: ${title}`, '🏆');
      showToast('Achievement added successfully!', 'success');
    }

    closeModal('modal-achievement');
  }

  function deleteAchievementRecord(id) {
    const a = appState.achievements.find(item => item.id === id);
    const title = a ? a.title : 'this item';
    showConfirmDialog('Delete Achievement', `Are you sure you want to remove "${title}"?`, () => {
      appState.achievements = appState.achievements.filter(item => item.id !== id);
      saveState(`Removed achievement: ${title}`, '🗑️');
      showToast('Achievement removed', 'info');
    });
  }

  function renderAchievements() {
    const container = document.getElementById('achievements-container');
    if (!container) return;

    const activeTab = document.querySelector('#achievement-category-tabs .pill-tab.active');
    const selectedCat = activeTab ? activeTab.getAttribute('data-category') : 'all';

    let filtered = appState.achievements;
    if (selectedCat && selectedCat !== 'all') {
      filtered = filtered.filter(a => a.category === selectedCat);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon">🏆</div>
          <h3 class="empty-state-title">No Achievements Found</h3>
          <p class="empty-state-desc">Record awards, hackathons, sports triumphs, and leadership roles here.</p>
          <button class="btn btn-primary btn-sm" onclick="window.openAchievementModal()">+ Add Achievement</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(a => `
      <div class="achievement-card">
        <span class="achieve-category-tag">${escapeHtml(a.category)}</span>
        <h3 class="achieve-title">${escapeHtml(a.title)}</h3>
        <span class="achieve-date">📅 ${escapeHtml(a.date || 'Date N/A')}</span>
        <p class="achieve-desc">${escapeHtml(a.description)}</p>
        <div class="card-actions-row">
          ${a.proofUrl ? `<a href="${escapeHtml(a.proofUrl)}" target="_blank" class="btn btn-outline btn-xs" style="margin-right:auto;">Proof Link ↗</a>` : ''}
          <button class="btn btn-secondary btn-xs" onclick="window.openAchievementModal('${a.id}')">Edit</button>
          <button class="btn btn-danger btn-xs" onclick="window.deleteAchievementRecord('${a.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  }

  // --- 12. INTERNSHIPS & EXPERIENCE ---
  function initInternshipsSection() {
    const btnOpenModal = document.getElementById('btn-open-internship-modal');
    if (btnOpenModal) btnOpenModal.addEventListener('click', () => openInternshipModal());

    const form = document.getElementById('form-internship');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveInternshipRecord();
      });
    }
  }

  function openInternshipModal(editId = null) {
    const form = document.getElementById('form-internship');
    form.reset();
    document.getElementById('intern-edit-id').value = editId || '';
    document.getElementById('modal-internship-title').textContent = editId ? 'Edit Internship Experience' : 'Add Internship Experience';

    if (editId) {
      const item = appState.internships.find(i => i.id === editId);
      if (item) {
        document.getElementById('intern-company').value = item.company;
        document.getElementById('intern-role').value = item.role;
        document.getElementById('intern-start-date').value = item.startDate || '';
        document.getElementById('intern-end-date').value = item.endDate || '';
        document.getElementById('intern-desc').value = item.description;
        document.getElementById('intern-skills').value = item.skillsLearned;
        document.getElementById('intern-proof').value = item.proofUrl || '';
      }
    }
    openModal('modal-internship');
  }

  function saveInternshipRecord() {
    const editId = document.getElementById('intern-edit-id').value;
    const company = document.getElementById('intern-company').value.trim();
    const role = document.getElementById('intern-role').value.trim();
    const startDate = document.getElementById('intern-start-date').value;
    const endDate = document.getElementById('intern-end-date').value;
    const description = document.getElementById('intern-desc').value.trim();
    const skillsLearned = document.getElementById('intern-skills').value.trim();
    const proofUrl = document.getElementById('intern-proof').value.trim();

    if (!company || !role || !description) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    if (editId) {
      const index = appState.internships.findIndex(i => i.id === editId);
      if (index !== -1) {
        appState.internships[index] = {
          ...appState.internships[index],
          company, role, startDate, endDate, description, skillsLearned, proofUrl
        };
        saveState(`Updated internship at ${company}`, '💼');
        showToast('Internship updated successfully!', 'success');
      }
    } else {
      const newIntern = {
        id: 'intern_' + Date.now(),
        company, role, startDate, endDate, description, skillsLearned, proofUrl
      };
      appState.internships.unshift(newIntern);
      saveState(`Added internship at ${company}`, '💼');
      showToast('Internship experience added successfully!', 'success');
    }

    closeModal('modal-internship');
  }

  function deleteInternshipRecord(id) {
    const item = appState.internships.find(i => i.id === id);
    const title = item ? `${item.role} at ${item.company}` : 'this experience';
    showConfirmDialog('Delete Internship', `Are you sure you want to delete "${title}"?`, () => {
      appState.internships = appState.internships.filter(i => i.id !== id);
      saveState(`Removed internship: ${title}`, '🗑️');
      showToast('Internship removed', 'info');
    });
  }

  function renderInternships() {
    const container = document.getElementById('internships-container');
    if (!container) return;

    if (appState.internships.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon">💼</div>
          <h3 class="empty-state-title">No Internship Experience Logged</h3>
          <p class="empty-state-desc">Chronicle your industrial training, apprenticeships, and company internships here.</p>
          <button class="btn btn-primary btn-sm" onclick="window.openInternshipModal()">+ Add Internship</button>
        </div>
      `;
      return;
    }

    container.innerHTML = appState.internships.map(intern => {
      const skills = (intern.skillsLearned || '').split(',').map(s => s.trim()).filter(Boolean);
      return `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-header">
              <div>
                <h3 class="intern-role">${escapeHtml(intern.role)}</h3>
                <div class="intern-company">🏢 ${escapeHtml(intern.company)}</div>
              </div>
              <span class="intern-duration">${escapeHtml(intern.startDate || 'Start')} — ${escapeHtml(intern.endDate || 'Present')}</span>
            </div>
            <p class="intern-desc">${escapeHtml(intern.description)}</p>
            ${skills.length > 0 ? `
              <div class="tags-container mb-2">
                ${skills.map(s => `<span class="tech-tag">${escapeHtml(s)}</span>`).join('')}
              </div>
            ` : ''}
            <div class="card-actions-row">
              ${intern.proofUrl ? `<a href="${escapeHtml(intern.proofUrl)}" target="_blank" class="btn btn-outline btn-xs" style="margin-right:auto;">Experience Proof ↗</a>` : ''}
              <button class="btn btn-secondary btn-xs" onclick="window.openInternshipModal('${intern.id}')">Edit</button>
              <button class="btn btn-danger btn-xs" onclick="window.deleteInternshipRecord('${intern.id}')">Delete</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- 13. PORTFOLIO PREVIEW GENERATOR & PRINT ---
  function initPortfolioPreview() {
    const printBtn = document.getElementById('btn-print-portfolio');
    const copyLinkBtn = document.getElementById('btn-copy-preview-link');

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    if (copyLinkBtn) {
      copyLinkBtn.addEventListener('click', () => {
        const url = window.location.href.split('#')[0] + '#portfolio-preview';
        navigator.clipboard.writeText(url).then(() => {
          showToast('Share link copied to clipboard!', 'success');
        }).catch(() => {
          showToast('Unable to copy automatically. URL: ' + url, 'info');
        });
      });
    }
  }

  function renderPortfolioPreview() {
    const p = appState.profile;

    // Header info
    const docAvatar = document.getElementById('doc-avatar');
    const docFullName = document.getElementById('doc-fullname');
    const docDept = document.getElementById('doc-dept-degree');
    const docCollege = document.getElementById('doc-college-year');
    const docEmail = document.getElementById('doc-email');
    const docPhone = document.getElementById('doc-phone');
    const docReg = document.getElementById('doc-regno');
    const docBio = document.getElementById('doc-bio');

    if (docAvatar) docAvatar.src = p.avatarUrl || 'assets/default-avatar.svg';
    if (docFullName) docFullName.textContent = p.fullName;
    if (docDept) docDept.textContent = p.department;
    if (docCollege) docCollege.textContent = `${p.college} · ${p.year}`;
    if (docEmail) docEmail.textContent = p.email;
    if (docPhone) docPhone.textContent = p.phone;
    if (docReg) docReg.textContent = `ID: ${p.studentId}`;
    if (docBio) docBio.textContent = p.bio;

    // Social Links in Doc
    const docLinkedin = document.getElementById('doc-link-linkedin');
    const docGithub = document.getElementById('doc-link-github');
    const docWebsite = document.getElementById('doc-link-website');

    if (docLinkedin) {
      docLinkedin.href = p.linkedin || '#';
      docLinkedin.style.display = p.linkedin ? 'inline-block' : 'none';
    }
    if (docGithub) {
      docGithub.href = p.github || '#';
      docGithub.style.display = p.github ? 'inline-block' : 'none';
    }
    if (docWebsite) {
      docWebsite.href = p.website || '#';
      docWebsite.style.display = p.website ? 'inline-block' : 'none';
    }

    // Education in Doc
    const docAcadContainer = document.getElementById('doc-academics-list');
    if (docAcadContainer) {
      if (appState.academics.length === 0) {
        docAcadContainer.innerHTML = '<p class="text-muted" style="font-size:0.9rem;">No academic qualifications listed.</p>';
      } else {
        docAcadContainer.innerHTML = appState.academics.map(acad => `
          <div class="doc-edu-item">
            <div>
              <div class="doc-edu-degree">${escapeHtml(acad.degree)}</div>
              <div class="doc-edu-inst">${escapeHtml(acad.institution)} · ${escapeHtml(acad.semester)} (${escapeHtml(acad.year)})</div>
              ${acad.achievements ? `<div style="font-size:0.82rem; color:var(--text-muted); margin-top:0.25rem;">⭐ ${escapeHtml(acad.achievements)}</div>` : ''}
            </div>
            <div class="doc-edu-score">${escapeHtml(acad.score)}</div>
          </div>
        `).join('');
      }
    }

    // Skills Matrix in Doc
    const docSkillsContainer = document.getElementById('doc-skills-list');
    if (docSkillsContainer) {
      if (appState.skills.length === 0) {
        docSkillsContainer.innerHTML = '<p class="text-muted" style="font-size:0.9rem;">No skills listed.</p>';
      } else {
        docSkillsContainer.innerHTML = appState.skills.map(s => `
          <div class="doc-skill-box">
            <div class="doc-skill-title">${escapeHtml(s.name)}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(s.category)} · ${escapeHtml(s.level)} (${s.percentage}%)</div>
            <div class="skill-progress-bar" style="margin:0.35rem 0 0; height:6px;">
              <div class="skill-progress-fill" style="width:${s.percentage}%"></div>
            </div>
          </div>
        `).join('');
      }
    }

    // Projects in Doc
    const docProjectsContainer = document.getElementById('doc-projects-list');
    if (docProjectsContainer) {
      if (appState.projects.length === 0) {
        docProjectsContainer.innerHTML = '<p class="text-muted" style="font-size:0.9rem;">No projects listed.</p>';
      } else {
        docProjectsContainer.innerHTML = appState.projects.map(proj => `
          <div class="doc-proj-box">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--primary-600);">${escapeHtml(proj.category)}</span>
              <span class="badge-status-pill badge-pill-green" style="font-size:0.68rem;">${escapeHtml(proj.status)}</span>
            </div>
            <h4 class="doc-proj-title">${escapeHtml(proj.title)}</h4>
            <p class="doc-proj-desc">${escapeHtml(proj.description)}</p>
            <div style="font-size:0.78rem; font-weight:600; color:var(--text-muted); margin-bottom:0.5rem;">
              Stack: ${escapeHtml(proj.techStack)}
            </div>
            <div style="display:flex; gap:0.5rem; font-size:0.8rem;">
              ${proj.liveDemo ? `<a href="${escapeHtml(proj.liveDemo)}" target="_blank" style="color:var(--primary-600); font-weight:600;">Live Demo ↗</a>` : ''}
              ${proj.github ? `<a href="${escapeHtml(proj.github)}" target="_blank" style="color:var(--text-muted); font-weight:600;">GitHub Repo ↗</a>` : ''}
            </div>
          </div>
        `).join('');
      }
    }

    // Experience in Doc
    const docInternWrapper = document.getElementById('doc-experience-wrapper');
    const docInternContainer = document.getElementById('doc-internships-list');
    if (docInternContainer && docInternWrapper) {
      if (appState.internships.length === 0) {
        docInternWrapper.style.display = 'none';
      } else {
        docInternWrapper.style.display = 'block';
        docInternContainer.innerHTML = appState.internships.map(intern => `
          <div class="doc-edu-item" style="margin-bottom:0.85rem;">
            <div>
              <div class="doc-edu-degree">${escapeHtml(intern.role)} — <span style="color:var(--primary-600);">${escapeHtml(intern.company)}</span></div>
              <div class="doc-edu-inst">${escapeHtml(intern.startDate)} — ${escapeHtml(intern.endDate || 'Present')}</div>
              <p style="font-size:0.88rem; color:var(--text-muted); margin:0.4rem 0;">${escapeHtml(intern.description)}</p>
              <div style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">Skills: ${escapeHtml(intern.skillsLearned)}</div>
            </div>
          </div>
        `).join('');
      }
    }

    // Certifications in Doc
    const docCertsWrapper = document.getElementById('doc-certs-wrapper');
    const docCertsContainer = document.getElementById('doc-certs-list');
    if (docCertsContainer && docCertsWrapper) {
      if (appState.certifications.length === 0) {
        docCertsWrapper.style.display = 'none';
      } else {
        docCertsWrapper.style.display = 'block';
        docCertsContainer.innerHTML = appState.certifications.map(c => `
          <div class="doc-skill-box">
            <div class="doc-skill-title">${escapeHtml(c.name)}</div>
            <div style="font-size:0.82rem; color:var(--text-muted);">${escapeHtml(c.issuer)} (Issued: ${escapeHtml(c.issueDate)})</div>
            ${c.credentialId ? `<div style="font-size:0.75rem; font-family:var(--font-mono); color:var(--text-light); margin-top:0.25rem;">ID: ${escapeHtml(c.credentialId)}</div>` : ''}
          </div>
        `).join('');
      }
    }

    // Achievements in Doc
    const docAchieveWrapper = document.getElementById('doc-achievements-wrapper');
    const docAchieveContainer = document.getElementById('doc-achievements-list');
    if (docAchieveContainer && docAchieveWrapper) {
      if (appState.achievements.length === 0) {
        docAchieveWrapper.style.display = 'none';
      } else {
        docAchieveWrapper.style.display = 'block';
        docAchieveContainer.innerHTML = appState.achievements.map(a => `
          <div class="doc-edu-item" style="margin-bottom:0.75rem;">
            <div>
              <div class="doc-edu-degree">${escapeHtml(a.title)}</div>
              <div class="doc-edu-inst">${escapeHtml(a.category)} · ${escapeHtml(a.date)}</div>
              <p style="font-size:0.88rem; color:var(--text-muted); margin-top:0.35rem;">${escapeHtml(a.description)}</p>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // --- 14. SETTINGS SECTION (RESET, CLEAR, BACKUP) ---
  function initSettingsSection() {
    // Reset to Demo Data
    const btnResetDemo = document.getElementById('btn-reset-demo-data');
    if (btnResetDemo) {
      btnResetDemo.addEventListener('click', () => {
        showConfirmDialog(
          'Reset to Sample Data',
          'Are you sure you want to restore the fictional sample student records? Any custom data entered will be overwritten.',
          () => {
            appState = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_DATA));
            saveState('Application reset to initial fictional sample dataset', '🔄');
            populateProfileForm();
            showToast('Reset to original sample data successfully!', 'success');
          }
        );
      });
    }

    // Clear All Data
    const btnClearAll = document.getElementById('btn-clear-all-data');
    if (btnClearAll) {
      btnClearAll.addEventListener('click', () => {
        showConfirmDialog(
          'Clear All Portfolio Data',
          'DANGER: This will permanently wipe all profile details, projects, skills, and certifications from your local browser storage. Are you sure you wish to proceed?',
          () => {
            appState = {
              profile: {
                fullName: 'New Student',
                studentId: '',
                college: '',
                department: '',
                year: '',
                email: '',
                phone: '',
                bio: '',
                avatarUrl: 'assets/default-avatar.svg',
                linkedin: '',
                github: '',
                website: ''
              },
              academics: [],
              projects: [],
              skills: [],
              certifications: [],
              achievements: [],
              internships: [],
              activities: [{ id: 'act_' + Date.now(), text: 'Cleared all records from portfolio.', time: 'Just now', icon: '🗑️' }]
            };
            saveState();
            populateProfileForm();
            showToast('All portfolio records cleared', 'warning');
          }
        );
      });
    }

    // Export Portfolio to JSON
    const btnExportJSON = document.getElementById('btn-export-json');
    if (btnExportJSON) {
      btnExportJSON.addEventListener('click', () => {
        const jsonStr = JSON.stringify(appState, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const filename = `student-portfolio-${(appState.profile.fullName || 'student').toLowerCase().replace(/\s+/g, '-')}.json`;
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Portfolio JSON exported successfully!', 'success');
      });
    }

    // Import Portfolio from JSON
    const importFileInput = document.getElementById('import-json-file');
    if (importFileInput) {
      importFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            try {
              const imported = JSON.parse(evt.target.result);
              if (!imported.profile) {
                throw new Error('Invalid format: missing profile object');
              }
              appState = {
                profile: { ...DEFAULT_SAMPLE_DATA.profile, ...(imported.profile || {}) },
                academics: Array.isArray(imported.academics) ? imported.academics : [],
                projects: Array.isArray(imported.projects) ? imported.projects : [],
                skills: Array.isArray(imported.skills) ? imported.skills : [],
                certifications: Array.isArray(imported.certifications) ? imported.certifications : [],
                achievements: Array.isArray(imported.achievements) ? imported.achievements : [],
                internships: Array.isArray(imported.internships) ? imported.internships : [],
                activities: Array.isArray(imported.activities) ? imported.activities : []
              };
              saveState('Imported portfolio data from JSON backup', '📥');
              populateProfileForm();
              showToast('Portfolio successfully restored from JSON backup!', 'success');
            } catch (err) {
              console.error(err);
              showToast('Failed to import JSON: ' + err.message, 'error');
            }
          };
          reader.readAsText(file);
        }
      });
    }
  }

  // --- 15. MODAL SYSTEM ---
  function initModals() {
    // Backdrop click or close button
    const closeBtns = document.querySelectorAll('[data-close-modal]');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        closeModal(modalId);
      });
    });

    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(bd => {
      bd.addEventListener('click', (e) => {
        if (e.target === bd) {
          closeModal(bd.id);
        }
      });
    });

    // Escape key closes open modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModalEl = document.querySelector('.modal-backdrop.show');
        if (openModalEl) closeModal(openModalEl.id);
      }
    });
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  // Confirmation Modal Handler
  let pendingConfirmAction = null;

  function showConfirmDialog(title, message, onConfirm) {
    const dialogTitle = document.getElementById('confirm-dialog-title');
    const dialogMsg = document.getElementById('confirm-dialog-msg');
    const okBtn = document.getElementById('confirm-dialog-ok');

    if (dialogTitle) dialogTitle.textContent = title;
    if (dialogMsg) dialogMsg.textContent = message;

    pendingConfirmAction = onConfirm;
    openModal('modal-confirm');

    if (okBtn) {
      okBtn.onclick = () => {
        closeModal('modal-confirm');
        if (typeof pendingConfirmAction === 'function') {
          pendingConfirmAction();
          pendingConfirmAction = null;
        }
      };
    }
  }

  // --- 16. TOAST NOTIFICATIONS SERVICE ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconMap = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    toast.innerHTML = `
      <div class="toast-content">
        <span>${iconMap[type] || 'ℹ️'}</span>
        <span>${escapeHtml(message)}</span>
      </div>
      <button class="toast-close" aria-label="Close notification">✕</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));

    container.appendChild(toast);

    // Auto dismiss after 3.5s
    setTimeout(() => {
      removeToast(toast);
    }, 3500);
  }

  function removeToast(toast) {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 250);
  }

  // Helper Escape HTML to prevent injection
  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- 17. GLOBAL WINDOW EXPORTS (FOR INLINE CLICK HANDLERS) ---
  window.openAcademicModal = openAcademicModal;
  window.deleteAcademicRecord = deleteAcademicRecord;
  window.openProjectModal = openProjectModal;
  window.deleteProjectRecord = deleteProjectRecord;
  window.viewProjectDetails = viewProjectDetails;
  window.openSkillModal = openSkillModal;
  window.deleteSkillRecord = deleteSkillRecord;
  window.openCertModal = openCertModal;
  window.deleteCertRecord = deleteCertRecord;
  window.openAchievementModal = openAchievementModal;
  window.deleteAchievementRecord = deleteAchievementRecord;
  window.openInternshipModal = openInternshipModal;
  window.deleteInternshipRecord = deleteInternshipRecord;

  // --- 18. MASTER RENDER DISPATCHER ---
  function renderAll() {
    renderProfile();
    renderDashboard();
    renderAcademics();
    renderProjects();
    renderSkills();
    renderCertifications();
    renderAchievements();
    renderInternships();
    renderPortfolioPreview();
  }

  // --- 19. APP BOOTSTRAP ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initModals();
    initProfileSection();
    initAcademicsSection();
    initProjectsSection();
    initSkillsSection();
    initCertificationsSection();
    initAchievementsSection();
    initInternshipsSection();
    initPortfolioPreview();
    initSettingsSection();

    // Initial Master Render
    renderAll();

    console.log('Student Portfolio Management System loaded successfully with sample data.');
  });

})();
