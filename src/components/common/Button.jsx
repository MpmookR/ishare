export default function Button({ children, onClick, type = 'button', variant = 'primary', style = {} }) {
  const baseStyle = {
    width: 350,
    height: 42,
    padding: 10,
    borderRadius: 32,
    border: 'none',
    fontSize: 18,
    fontFamily: 'EB Garamond',
    fontWeight: 400,
    lineHeight: '21.6px',
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  };

  const variants = {
    primary: {
      background: 'var(--color-primary-blue)',
      color: 'white',
    },
    orange: {
      background: 'var(--color-primary-orange)',
      color: 'white',
    },
    outline: {
      background: 'transparent',
      border: '2px solid var(--color-primary-blue)',
      color: 'var(--color-primary-blue)',
    },
    danger: {
      background: 'red',
      color: 'white',
    },
  };

  const finalStyle = {
    ...baseStyle,
    ...variants[variant],
    ...style,
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <button type={type} onClick={onClick} style={finalStyle}>
        {children}
      </button>
    </div>
  );
}