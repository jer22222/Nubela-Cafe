import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [users, setUsers] = useState({
    'jerson@gmail.com': '12345678',
    'john@nubela.com': 'cafe123',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');

  const handleLoginSuccess = (email) => {
    const name = email.split('@')[0];
    setIsLoggedIn(true);
    setUserName(name);
    setCurrentView('dashboard');
    setMessage(`Welcome, ${name}!`);
  };

  const handleRegisterSuccess = (email, password) => {
    setUsers((prev) => ({ ...prev, [email]: password }));
    setCurrentView('login');
    setMessage('Registration successful! Please log in.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentView('login');
    setMessage('You have been logged out.');
  };

  return (
    <div className="container">
      <div className="overlay"></div>
      <div className="sidebar-title">Nubela Cafe</div>

      {message && <div className="message">{message}</div>}

      <div className="card">
        {isLoggedIn && currentView === 'dashboard' ? (
          <Dashboard userName={userName} onLogout={handleLogout} />
        ) : currentView === 'register' ? (
          <Register
            onRegisterSuccess={handleRegisterSuccess}
            setCurrentView={setCurrentView}
            setMessage={setMessage}
          />
        ) : (
          <Login
            users={users}
            onLoginSuccess={handleLoginSuccess}
            setCurrentView={setCurrentView}
            setMessage={setMessage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
