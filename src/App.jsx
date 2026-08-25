import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import "./App.css";


function MainLayout({ children }) {
  return (
    <div className="app-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="main-content">

        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE */}
        <main className="page-content">
          {children}
        </main>

      </div>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================= DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />


        {/* ================= STUDENTS ================= */}

        <Route
          path="/students"
          element={
            <MainLayout>
              <Students />
            </MainLayout>
          }
        />


        {/* ================= STUDENT DETAILS ================= */}

        <Route
          path="/students/:studentId"
          element={
            <MainLayout>
              <StudentDetails />
            </MainLayout>
          }
        />


        {/* ================= ANALYTICS ================= */}

        <Route
          path="/analytics"
          element={
            <MainLayout>
              <Analytics />
            </MainLayout>
          }
        />


        {/* ================= SETTINGS ================= */}

        <Route
          path="/settings"
          element={
            <MainLayout>
              <Settings />
            </MainLayout>
          }
        />


        {/* ================= PROFILE ================= */}

        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />


        {/* ================= DEFAULT ================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* ================= UNKNOWN URL ================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;