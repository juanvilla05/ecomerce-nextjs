import React from 'react';

interface DynamicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function DynamicButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}: DynamicButtonProps) {
  const getVariantStyles = () => {
    const baseStyles = {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s',
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : 'auto',
    };

    const variants = {
      primary: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      },
      secondary: {
        backgroundColor: '#6c757d',
        color: 'white',
      },
      danger: {
        backgroundColor: '#dc3545',
        color: 'white',
      },
      success: {
        backgroundColor: '#28a745',
        color: 'white',
      },
    };

    return { ...baseStyles, ...variants[variant] };
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={getVariantStyles()}
      onMouseOver={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {children}
    </button>
  );
}