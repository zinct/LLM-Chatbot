import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// component
import { ErrorAlertProvider, setupErrorListener, useErrorAlert } from './provider-erroralert'
import  { AuthProvider, useAuth }  from './provider-auth'
import DashboardLayout from './layout-dashboard'

// page
import HomePage from './page-home'
import LoginPage from './page-login'
import RegisterPage from './page-register'
import DashboardPage from './page-dashboard'

import '../index.css';

const ResumeGeneratorLayout = ({children, navigate}) => {
  const { identity, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading === false && identity === null) navigate("/get-started");
  }, [identity, isLoading]);

  return children;
};

function ErrorEventListener({ children }) {
  const { showError } = useErrorAlert();

  useEffect(() => {
    // Set up the global error event listener
    return setupErrorListener(showError);
  }, [showError]);

  return children;
}

function App() {
  const [page, setPage] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPage(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setPage(path);
  };

  return (
    <ErrorAlertProvider>
      <ErrorEventListener>
        <AuthProvider>
          <>
            {page === "/" && <HomePage navigate={navigate} />}
            {page === "/get-started" && <LoginPage navigate={navigate} />}
            {page === "/register" && <RegisterPage navigate={navigate} />}
            {page === "/dashboard" && (
              <DashboardLayout navigate={navigate} location={page}>
                <DashboardPage navigate={navigate} />
              </DashboardLayout>
            )}
            {page === "/dashboard/cv-generator" && (
              <DashboardLayout navigate={navigate} location={page}>
                <CVGeneratorPage navigate={navigate} />
              </DashboardLayout>
            )}
          </>
        </AuthProvider>
      </ErrorEventListener>
    </ErrorAlertProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <h1 className="text-red-500 pt-10" style={{ fontSize: "4rem", position: "absolute", zIndex: 9999 }}>
        Im sorry due to file size limitations on ICP Ninja. Please run the frontend locally through my GitHub. Thank you
      </h1>
    <App />
  </React.StrictMode>
);
