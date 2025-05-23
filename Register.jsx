import { useState } from 'react';

const Register = ({ onRegisterSuccess, setCurrentView, setMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password || !confirm) {
      setMessage('All fields are required.');
      return;
    }
    if (password !== confirm) {
      setMessage('Passwords do not match.');
      return;
    }

    onRegisterSuccess();
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" required />
        </div>
        <button className="button" type="submit">Register</button>
      </form>
      <button className="link-button" onClick={() => { setCurrentView('login'); setMessage(''); }}>
        Back to login
      </button>
    </>
  );
};

export default Register;
