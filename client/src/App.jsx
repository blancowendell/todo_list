// import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import TodoPage from './pages/TodoPage';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsAuthenticated(!!localStorage.getItem('token'));
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   return (
//     <BrowserRouter>
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={isAuthenticated ? <TodoPage /> : <Navigate to="/login" />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;