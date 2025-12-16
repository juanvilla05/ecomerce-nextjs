"use client";

import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProfilePage() {
  const { user, isLoading, session } = useAuth({ requireAuth: true });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '2rem auto', 
      padding: '2rem',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        👤 Mi Perfil
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ 
          padding: '1.5rem', 
          background: '#f8f9fa', 
          borderRadius: '12px',
          borderLeft: '4px solid #667eea'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
            <strong>Nombre de usuario:</strong>
          </p>
          <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>
            {user?.name || 'No disponible'}
          </p>
        </div>

        <div style={{ 
          padding: '1.5rem', 
          background: '#f8f9fa', 
          borderRadius: '12px',
          borderLeft: '4px solid #667eea'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
            <strong>Email:</strong>
          </p>
          <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>
            {user?.email || 'No disponible'}
          </p>
        </div>

        <div style={{ 
          padding: '1.5rem', 
          background: '#f8f9fa', 
          borderRadius: '12px',
          borderLeft: '4px solid #667eea'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
            <strong>Rol:</strong>
          </p>
          <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>
            {user?.role === 'admin' ? (
              <span style={{ 
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                display: 'inline-block'
              }}>
                👑 Administrador
              </span>
            ) : (
              <span style={{ 
                background: '#e0e7ff',
                color: '#667eea',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                display: 'inline-block'
              }}>
                Usuario
              </span>
            )}
          </p>
        </div>

        <div style={{ 
          padding: '1.5rem', 
          background: '#f8f9fa', 
          borderRadius: '12px',
          borderLeft: '4px solid #667eea'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
            <strong>Token de sesión:</strong>
          </p>
          <p style={{ 
            fontSize: '0.85rem', 
            fontWeight: '500', 
            color: '#555',
            wordBreak: 'break-all',
            fontFamily: 'monospace',
            background: '#fff',
            padding: '0.75rem',
            borderRadius: '8px'
          }}>
            {session?.accessToken?.substring(0, 50)}...
          </p>
        </div>
      </div>
    </div>
  );
}