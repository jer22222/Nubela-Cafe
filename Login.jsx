import { useState } from 'react';

const Login = ({ users, onLoginSuccess, setCurrentView, setMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');

    if (users[email] === password) {
      const userName = email.split('@')[0];
      onLoginSuccess(userName);
    } else {
      setMessage('Invalid email or password.');
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>
        <button className="button" type="submit">Login</button>
      </form>
      <button className="link-button" onClick={() => { setCurrentView('register'); setMessage(''); }}>
        Register here
      </button>
    </>
  );
};

export default Login;
