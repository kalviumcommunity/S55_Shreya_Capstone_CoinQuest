import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [mode, setMode] = useState('login'); // or 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        const res = await axios.post('/login', { username, password });
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        await axios.post('/register', { username, password });
        setMode('login');
      }
    } catch (err) {
      setError('Error: ' + (err?.response?.data?.error || 'Something went wrong'));
    }
  };

  return (
    <div className="auth-form">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      <p onClick={toggleMode} className="toggle-link">
        {mode === 'login'
          ? "Don't have an account? Register"
          : 'Already have an account? Login'}
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AuthForm;
