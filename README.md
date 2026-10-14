# Student Portfolio Management System (SPMS)

A modern, responsive, and complete digital portfolio management web application built with **HTML5, CSS3, and Vanilla JavaScript**.

Designed specifically for students, campus placement preparation, academic reviews, and digital resume generation.

---

## 🌟 Key Features

1. **Modern Responsive UI & UX**:
   - Indigo, soft-purple, and clean modern blue color scheme.
   - Light Mode & Dark Mode switch with persistent memory.
   - Responsive sidebar layout with collapsible mobile drawer.
   - Subtle hover animations, progress meters, and elevation shadows.

2. **Full LocalStorage Persistence**:
   - Zero backend or database required.
   - Automatically saves all student changes, custom projects, academics, and certifications in the browser's `localStorage`.
   - Never loses data on page refresh.

3. **10 Main Sections & Workspaces**:
   - **Landing Page**: Product hero, feature showcase, and quick launch triggers.
   - **Student Dashboard**: Welcome banner, dynamic profile completion gauge, 4 statistical metric counters, recent activities feed, and academic snapshots.
   - **Student Profile**: Complete student metadata, contact links, biography, and interactive profile photo upload (base64 image preview).
   - **Academic Records**: Manage semester GPAs, degree progress, institutions, and academic honors.
   - **Projects Management**: Add, edit, delete, and view software builds with image thumbnails, tech stack tags, live demo links, and GitHub repositories. Includes search and filter controls.
   - **Skills Matrix**: Categorized technical and soft skills with proficiency ratings (Beginner, Intermediate, Advanced, Expert) and visual progress bars.
   - **Certifications Hub**: Track vendor credentials, issue/expiration dates, credential IDs, and live verification URLs.
   - **Achievements & Activities**: Chronicle hackathon victories, academic honors, student leadership roles, and extracurricular accomplishments.
   - **Internships & Experience**: Professional timeline detailing companies, roles, durations, responsibilities, and key skills learned.
   - **Portfolio Preview & Print**: Recruiter-ready public showcase with print-optimized styling (`@media print`) for 1-click printing or PDF export.
   - **System Settings**: Theme switcher, JSON data export/backup, JSON data import, and sample data reset.

4. **Interactive Modal System & Toast Notifications**:
   - Accessible modal dialogs for all Add/Edit actions.
   - Custom confirmation dialogs before deleting records or resetting data.
   - Sleek toast notifications for real-time user feedback.

---

## 📁 Project Structure

```text
student-portfolio-management-system/
├── index.html                  # Semantic structure & accessible HTML5 markup
├── style.css                   # Custom styling, dark mode tokens & print media
├── script.js                   # Application state, LocalStorage CRUD & UI logic
├── assets/
│   ├── logo.svg                # Application branding logo
│   ├── default-avatar.svg      # Clean fallback student avatar
│   ├── cert-badge.svg          # Certification badge illustration
│   ├── project-ecoroute.svg    # EcoRoute project thumbnail
│   ├── project-carepulse.svg   # CarePulse project thumbnail
│   └── project-codecollab.svg  # CodeCollab project thumbnail
└── README.md                   # Documentation and usage guide
```

---

## 🚀 How to Run the Project

1. Navigate to the project directory:
   ```bash
   cd C:\Users\ANUSHEYA\.gemini\antigravity\scratch\student-portfolio-management-system
   ```
2. Simply double-click **`index.html`** or right-click and open it in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).
3. No build tools, Node.js, Python, or external servers are required!

---

## 🛡️ Data Reset & Portability
- To restore the default fictional student records at any time, navigate to **Settings** in the sidebar and click **"Reset Sample Data"**.
- To create a backup, click **"Export JSON"** in Settings.
