# ResumeForge — Professional Resume Builder

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that allows users to create professional resumes online, preview them in real time, choose from multiple templates, and download as PDF.

## 🚀 Features

### Authentication
- User Registration & Login
- JWT Authentication with bcryptjs password hashing
- Protected routes & logout functionality

### Resume Builder
- **Create, Edit, Delete, Duplicate** resumes
- **Live Preview** — see changes in real-time as you type
- **Auto-Save** — resumes save automatically every 2 seconds
- **Multiple Templates** — 4 professionally designed templates
- **PDF Download** — high-quality PDF using html2pdf.js
- **Print Resume** — direct print from browser
- **Share Link** — unique public URL for each resume
- **Search** — search saved resumes by title

### Resume Sections
- Personal Information (with profile photo)
- Career Objective
- Education
- Technical & Soft Skills
- Projects
- Internships
- Work Experience
- Certifications
- Achievements
- Languages Known

### Templates
1. **Modern** — Clean sidebar layout with accent colors
2. **Professional** — Traditional serif styling with dividers
3. **Creative** — Vibrant colors with timeline layout
4. **ATS-Friendly** — Plain text optimized for ATS parsing

### Additional Features
- 🌙 Dark Mode
- 📱 Mobile Responsive
- 🔔 Toast Notifications
- ⏳ Loading Spinners
- 👤 Profile Photo Upload
- 🛡️ Admin Dashboard

---

## 📁 Project Structure

```
resume-builder/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── resumeController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Resume.js
│   │   └── Template.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── resumeRoutes.js
│   │   └── adminRoutes.js
│   ├── seeds/
│   │   └── seedTemplates.js
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── AdminRoute.js
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── TemplateCard.js
│   │   │   ├── PDFDownloadButton.js
│   │   │   ├── ResumeForm/
│   │   │   │   ├── PersonalInfoForm.js
│   │   │   │   ├── CareerObjectiveForm.js
│   │   │   │   ├── EducationForm.js
│   │   │   │   ├── SkillsForm.js
│   │   │   │   ├── ProjectsForm.js
│   │   │   │   ├── InternshipsForm.js
│   │   │   │   ├── WorkExperienceForm.js
│   │   │   │   ├── CertificationsForm.js
│   │   │   │   ├── AchievementsForm.js
│   │   │   │   └── LanguagesForm.js
│   │   │   └── ResumePreview/
│   │   │       ├── ResumePreview.js
│   │   │       └── templates/
│   │   │           ├── ModernTemplate.js
│   │   │           ├── ProfessionalTemplate.js
│   │   │           ├── CreativeTemplate.js
│   │   │           └── ATSTemplate.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── CreateResumePage.js
│   │   │   ├── EditResumePage.js
│   │   │   ├── ResumePreviewPage.js
│   │   │   ├── TemplatesPage.js
│   │   │   ├── ProfilePage.js
│   │   │   ├── SharedResumePage.js
│   │   │   └── AdminDashboardPage.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   ├── ThemeContext.js
│   │   │   └── ResumeContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── darkMode.css
│   │   │   └── templates.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js** v16+ installed
- **MongoDB** installed locally OR a MongoDB Atlas account
- **VS Code** (recommended)

### Step 1: Clone/Setup
```bash
cd "e:\Resume Builder"
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 4: Configure Environment Variables
Edit `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/resumebuilder
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

> **For MongoDB Atlas**: Replace `MONGO_URI` with your Atlas connection string.

### Step 5: Seed Templates (Optional)
```bash
cd backend
npm run seed
```

### Step 6: Start the Application

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
```

### Step 7: Open the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

## 🔧 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get profile |
| PUT | `/api/auth/profile` | Update profile |
| POST | `/api/auth/upload-photo` | Upload photo |

### Resume Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resumes` | Create resume |
| GET | `/api/resumes` | Get user's resumes |
| GET | `/api/resumes/:id` | Get single resume |
| PUT | `/api/resumes/:id` | Update resume |
| DELETE | `/api/resumes/:id` | Delete resume |
| POST | `/api/resumes/:id/duplicate` | Duplicate resume |
| GET | `/api/resumes/shared/:slug` | Get shared resume |
| PUT | `/api/resumes/:id/download` | Increment downloads |

### Admin Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | List all users |
| DELETE | `/api/admin/users/:id` | Delete user |
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/templates` | List templates |
| PUT | `/api/admin/templates/:id` | Toggle template |

---

## 🛡️ Creating an Admin User

After registering a user, update their role in MongoDB:
```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or run the seed script to auto-create templates:
```bash
cd backend
npm run seed
```

---

## ❗ Common Errors & Fixes

| Error | Solution |
|-------|----------|
| `ECONNREFUSED` on MongoDB | Ensure MongoDB is running: `mongod` |
| CORS errors | Backend configured for `http://localhost:3000` |
| JWT expired | Re-login (token expires in 30 days) |
| File too large (Multer) | Max profile photo size is 5MB |
| Blank PDF | Ensure resume preview is visible before download |
| `MODULE_NOT_FOUND` | Run `npm install` in both backend and frontend |
| Port 5000 in use | Change PORT in `.env` |
| Port 3000 in use | React will suggest using port 3001 |

---

## 🧰 Technology Stack

| Technology | Purpose |
|-----------|---------|
| React.js 18 | Frontend UI |
| React Router v6 | Client-side routing |
| Bootstrap 5 | UI framework |
| React-Bootstrap | Bootstrap components |
| Axios | HTTP client |
| React-Toastify | Toast notifications |
| React-Icons | Icons |
| html2pdf.js | PDF generation |
| Node.js | Backend runtime |
| Express.js | Backend framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Multer | File uploads |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

Built with ❤️ using MERN Stack
