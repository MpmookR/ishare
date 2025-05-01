import React from 'react';

export default function TextField({ label, name, value, onChange, placeholder = '', type = 'text' }) {
  return (
    <div style={{ width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
      {/* Label */}
      <div style={{ alignSelf: 'stretch', paddingLeft: 8, paddingRight: 8, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
        <div style={{
          flex: '1 1 0',
          color: 'var(--color-black)',
          fontSize: 'var(--font-size-body)',
          fontFamily: 'var(--font-body)',
          fontWeight: 'var(--font-weight-normal)',
          lineHeight: '21.6px',
          wordWrap: 'break-word'
        }}>
          {label}
        </div>
      </div>

      {/* Input */}
      <div style={{ alignSelf: 'stretch', padding: 16, background: 'var(--color-white)', borderRadius: 21, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            background: 'transparent',
            color: 'var(--color-black)',
            fontSize: '18px',
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--font-weight-normal)',
            lineHeight: '21.6px',
            wordWrap: 'break-word'
          }}
        />
      </div>
    </div>
  );
}