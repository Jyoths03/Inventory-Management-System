import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './components/Dash';
import Inventory from './components/Invent';
import Orders from './components/Order';
import Reports from './components/Report';
import BillingPage from './components/Billing';
import LoginRegister from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'; // Import custom CSS for styling

function App() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {token && ( // Show sidebar only if authenticated
           <aside className="sidebar">
           <h2 className="sidebar-title">Admin Panel</h2>
           <ul className="sidebar-links">
             <li><Link to="/dashboard">🏠 Dashboard</Link></li>
             <li><Link to="/inventory">📦 Inventory</Link></li>
             <li><Link to="/orders">📝 Orders</Link></li>
             <li><Link to="/billing">💳 Billing</Link></li>
             <li><Link to="/reports">📊 Reports</Link></li>
             <li>
               <button className="logout-button" onClick={handleLogout}>
                 🚪 Logout
               </button>
             </li>
           </ul>
         </aside>
        )}

        <main style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/register" element={<LoginRegister />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
       

      </div>
    </Router>
  );
}

export default App;
