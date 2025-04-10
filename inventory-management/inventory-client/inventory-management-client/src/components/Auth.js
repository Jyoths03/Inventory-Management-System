import React, { useState } from 'react';
import axios from 'axios';

const LoginRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Added email state
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      // Email validation for registration
      if (!email.includes('@') && !isLogin) {
        setErrorMessage('Please enter a valid email address');
        return;
      }

      const endpoint = isLogin ? '/api/login' : '/api/register';
      const response = await axios.post(endpoint, { username, email, password }); // Added email to the request

      // Save token in local storage on successful login/registration
      localStorage.setItem('token', response.data.token);

      // Redirect to dashboard after successful login/registration
      window.location.href = '/dashboard';
    } catch (error) {
      setErrorMessage(error.response.data.error || 'Authentication failed');
      console.error(error.response.data);
    }
  };

  const styles = {
    outerContainer: {
      background: 'linear-gradient(to right, #00c6ff, #0072ff)', // Gradient background for a modern feel
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute', // Ensure the container takes the full screen
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 0,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      maxWidth: '420px',
      width: '100%',
      position: 'relative',
      zIndex: 1,
    },
    title: {
      marginBottom: '20px',
      fontSize: '48px',
      fontFamily: '"Poppins", sans-serif',
      color: '#333',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '22px',
      color: '#0072ff',
      marginBottom: '30px',
    },
    backgroundTitle: {
      position: 'absolute',
      top: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '72px',
      color: 'rgba(255, 255, 255, 0.3)',
      textAlign: 'center',
      pointerEvents: 'none',
      filter: 'drop-shadow(0 0 15px rgba(0, 255, 0, 0.7))',
      animation: 'pulse 2s infinite',
      zIndex: 0,
    },
    input: {
      width: '100%',
      padding: '15px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
    },
    inputFocus: {
      borderColor: '#0072ff',
      boxShadow: '0 0 8px rgba(0, 114, 255, 0.5)',
    },
    button: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#0072ff',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '18px',
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#005bb5',
    },
    switchButton: {
      marginTop: '20px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#0072ff',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontSize: '16px',
    },
    error: {
      color: '#e74c3c',
      marginTop: '15px',
      textAlign: 'center',
    },
    '@keyframes pulse': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' },
      '100%': { transform: 'scale(1)' },
    },
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.backgroundTitle}></div>
      <div style={styles.container}>
        <h1 style={styles.title}>Inventory Management</h1>
        <h2 style={styles.subtitle}>{isLogin ? 'Login' : 'Register'} Page</h2>
        <form onSubmit={handleAuth} style={{ width: '100%' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
            onBlur={(e) => e.target.style = styles.input}
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
            onBlur={(e) => e.target.style = styles.input}
          />
          <button type="submit" style={styles.button}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} style={styles.switchButton}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginRegister;

