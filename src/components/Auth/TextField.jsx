export default function TextField({ id, label, type = 'text', value, onChange, placeholder }) {
  return (
    <div style={{ width: '100%' }}>
      <label htmlFor={id} style={{
        display: 'block',
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 18,
        fontFamily: 'EB Garamond',
        fontWeight: 500,
        color: 'black',
        lineHeight: '21.6px',
      }}>{label}</label>

      <div style={{
        width: '100%',
        padding: 16,
        background: 'white',
        borderRadius: 21,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: 18,
            fontFamily: 'EB Garamond',
            fontWeight: 300,
            color: '#000',
            lineHeight: '21.6px',
          }}
        />
      </div>
    </div>
  );
}