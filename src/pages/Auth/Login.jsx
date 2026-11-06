import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import '../../styles/login.css';

const Login = () => {
  const [schoolCode, setSchoolCode] = useState('EMET101');
  const [username, setUsername] = useState('ADMIN101');
  const [password, setPassword] = useState('admin789');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await authService.login(schoolCode, username, password);
      login(response.user, response.school);
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const setQuickDemo = (id) => {
    setSchoolCode('EMET101');
    setUsername(id);
    setPassword('admin789');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <div className="login-left" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600')` }}></div>
        <div className="login-right">
          <h1 style={{ color: '#00a65a', marginBottom: '10px', fontSize: '26px' }}>ePFuture</h1>

          {/* Quick Demo Selector */}
          <div style={{ marginBottom: '15px', display: 'flex', gap: '8px' }}>
            <button 
              type="button" 
              onClick={() => setQuickDemo('ADMIN101')}
              style={{ fontSize: '11px', padding: '4px 8px', background: '#1a3b5d', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
            >
              Demo: Admin ID
            </button>
            <button 
              type="button" 
              onClick={() => setQuickDemo('PARENT101')}
              style={{ fontSize: '11px', padding: '4px 8px', background: '#2e7d32', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
            >
              Demo: Parent ID
            </button>
          </div>

          {errorMsg && <div style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>{errorMsg}</div>}

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>School Code</label>
              <input type="text" className="form-input" value={schoolCode} onChange={(e) => setSchoolCode(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>User ID</label>
              <input type="text" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="login-actions">
              <button type="button" className="btn-forgot">Forgot Password</button>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Authenticating...' : 'Login to Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="login-footer">
        <div>© 2021-25 Innovasphere Infotech</div>
        <div>Contact : customercare@innovasphere.in</div>
      </div>
    </div>
  );
};

export default Login;