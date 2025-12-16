/**
 * Componente de error
 * Muestra mensajes de error con opción de reintentar
 */
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      minHeight: '300px',
    }}>
      <div style={{
        fontSize: '3rem',
        marginBottom: '1rem',
      }}>
        ⚠️
      </div>
      <p style={{
        fontSize: '1.2rem',
        color: '#dc3545',
        textAlign: 'center',
        marginBottom: '1rem',
      }}>
        {message}
      </p>
      {/* Botón opcional para reintentar */}
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#5568d3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#667eea')}
        >
          Reintentar
        </button>
      )}
    </div>
  );
}