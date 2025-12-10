"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Credenciales inválidas');
        setLoading(false);
        return;
      }

      if (result?.ok) {
        setSuccess(`¡Bienvenido ${username}! Redirigiendo...`);
        
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 1500);
      }
    } catch (err) {
      setError('Error al iniciar sesión');
      setLoading(false);
      console.error(err);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  };

  const formWrapperStyle = {
    background: '#fff',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: '420px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#333',
  };

  const inputStyle = {
    padding: '0.75rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
  };

  const submitButtonStyle: React.CSSProperties = {
    background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    padding: '0.875rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.05rem',
    fontWeight: '600',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
  };

  const errorStyle = {
    color: '#dc3545',
    fontSize: '0.95rem',
    textAlign: 'center' as const,
    padding: '0.75rem',
    backgroundColor: '#fee',
    borderRadius: '8px',
    fontWeight: '500',
  };

  const successStyle = {
    color: '#28a745',
    fontSize: '0.95rem',
    textAlign: 'center' as const,
    padding: '0.75rem',
    backgroundColor: '#d4edda',
    borderRadius: '8px',
    fontWeight: '600',
    animation: 'slideIn 0.3s ease-out',
  };

  return (
    <div style={containerStyle}>
      <div style={formWrapperStyle}>
        <h1 style={titleStyle}>🛍️ Iniciar Sesión</h1>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#666', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
          <strong>Usuario de prueba:</strong> mor_2314<br />
          <strong>Contraseña:</strong> 83r5^_
        </p>
        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              placeholder="Ingresa tu usuario"
              required
              disabled={loading}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Ingresa tu contraseña"
              required
              disabled={loading}
            />
          </div>
          {error && <p style={errorStyle}>❌ {error}</p>}
          {success && <p style={successStyle}>✅ {success}</p>}
          <button type="submit" style={submitButtonStyle} disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}