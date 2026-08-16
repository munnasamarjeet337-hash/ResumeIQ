import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/common/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import AnalyzingPage from './pages/AnalyzingPage';
import ResultsScorePage from './pages/ResultsScorePage';
import ResultsSkillsPage from './pages/ResultsSkillsPage';
import ResultsJobsPage from './pages/ResultsJobsPage';
import ResultsSuggestionsPage from './pages/ResultsSuggestionsPage';
import HistoryPage from './pages/HistoryPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* 1. Public Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* 2-5. Auth Flow */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* 6. User Dashboard (Protected) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* 7-8. Upload & Processing Flow */}
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analyzing"
              element={
                <ProtectedRoute>
                  <AnalyzingPage />
                </ProtectedRoute>
              }
            />

            {/* 9-12. Results Sub-Routes */}
            <Route path="/results/:id/score" element={<ResultsScorePage />} />
            <Route path="/results/:id/skills" element={<ResultsSkillsPage />} />
            <Route path="/results/:id/jobs" element={<ResultsJobsPage />} />
            <Route path="/results/:id/suggestions" element={<ResultsSuggestionsPage />} />

            {/* 13. History (Protected) */}
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />

            {/* 14. Admin Console */}
            <Route path="/admin" element={<AdminPage />} />

            {/* 15. Static / Support Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
