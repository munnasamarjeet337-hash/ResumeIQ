# ResumeIQ — AI-Powered Resume Analyzer & Job Recommendation System

ResumeIQ is a full-stack, enterprise-grade AI resume scoring and career intelligence platform. It parses PDF and DOCX resumes, extracts key skills and entities via spaCy NLP, computes a 4-part weighted ATS score, and matches candidates to target roles using TF-IDF cosine similarity.

---

## 🌟 Key Features

- **Multi-Format Resume Parsing**: Supports PDF and DOCX uploads up to 5MB with structured section extraction (Contact, Summary, Experience, Education, Skills, Projects, Certifications).
- **Explainable 4-Part Weighted ATS Scoring**:
  - **Skill Match (40%)**: Ratio of industry-standard tech stack and domain competencies.
  - **Experience Relevance (30%)**: Years of experience, role seniority, and action verb density.
  - **ATS Formatting (20%)**: Standard typography, clear headers, zero parsing anomalies.
  - **Keyword Density (10%)**: Natural frequency of high-impact job keywords without keyword stuffing.
- **Role Recommendations**: TF-IDF cosine similarity vectorization matching candidates against 20+ predefined tech roles with matching & missing skill breakdown.
- **Enterprise Security**:
  - Bcrypt password hashing (salt rounds 12).
  - JWT stateless session authentication with 7-day expiration.
  - Strict 6-digit OTP verification via Resend and Brevo APIs.
- **Dynamic Dual Theme**: Modern Indigo & Slate design with light and dark mode toggling.

---

## 🏗️ Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, Framer Motion, Lucide React, Axios, React Router v6.
- **Backend**: Python 3.11+, Flask, spaCy (`en_core_web_sm`), NLTK, Scikit-learn, PyPDF2, python-docx, Bcrypt, PyJWT.
- **Database**: MongoDB / Resilient Document Store.
- **Email Delivery**: Resend REST API / Brevo Transactional Email.

---

## 🚀 Local Development Setup

### 1. Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('punkt_tab')"
python run.py
```
Backend will start on `http://127.0.0.1:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will start on `http://localhost:5173`.

---

## 🌐 Production Cloud Deployment

### 1. Backend on Render (Free Tier)
- **Service Type**: Web Service
- **Root Directory**: `backend`
- **Build Command**:
  ```bash
  pip install -r requirements.txt && python -m spacy download en_core_web_sm && python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('punkt_tab')"
  ```
- **Start Command**:
  ```bash
  gunicorn run:app --bind 0.0.0.0:$PORT --workers 2 --threads 4 --timeout 120
  ```
- **Environment Variables**:
  - `FLASK_ENV`: `production`
  - `DEBUG`: `False`
  - `SECRET_KEY`: `your-strong-secret-key`
  - `JWT_SECRET_KEY`: `your-jwt-secret-key`
  - `RESEND_API_KEY`: `re_R7eZrhgD_5yqoPL8nk1z5pBBFgc1pvaCE`
  - `BREVO_API_KEY`: `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`
  - `BREVO_SENDER_EMAIL`: `c81samarjeet@gmail.com`
  - `FRONTEND_URL`: `https://your-app.vercel.app`

### 2. Frontend on Vercel (Free Tier)
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `https://your-backend.onrender.com` (Your live Render backend URL)
