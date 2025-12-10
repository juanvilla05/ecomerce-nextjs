"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
    city: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          name: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          address: {
            city: formData.city,
            street: 'default',
            number: 0,
            zipcode: '00000',
            geolocation: {
              lat: '0',
              long: '0',
            },
          },
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (data.id) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError('Error al registrar el usuario');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      console.error(err);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '2rem',
  };

  const formWrapperStyle = {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
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
    fontWeight: '500',
    color: '#555',
  };

  const inputStyle = {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
  };

  const submitButtonStyle = {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  };

  const errorStyle = {
    color: '#dc3545',
    fontSize: '0.9rem',
    textAlign: 'center' as const,
    padding: '0.5rem',
    backgroundColor: '#f8d7da',
    borderRadius: '4px',
  };

  const successStyle = {
    color: '#155724',
    fontSize: '0.9rem',
    textAlign: 'center' as const,
    padding: '0.5rem',
    backgroundColor: '#d4edda',
    borderRadius: '4px',
  };

  return (
    <div style={containerStyle}>
      <div style={formWrapperStyle}>
        <h1 style={titleStyle}>Crear Cuenta</h1>
        {success && (
          <p style={successStyle}>
            ¡Registro exitoso! Redirigiendo al login...
          </p>
        )}
        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Nombre</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Apellido</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Ciudad</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          {error && <p style={errorStyle}>{error}</p>}
          <button
            type="submit"
            style={submitButtonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}