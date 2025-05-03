import React from 'react';

export default function SelectField({ label, name, value, onChange, options = [], error = false, errorMessage = ""
}) {
  return (
    <div style={{ width: '100%', flexDirection: 'column', gap: 8, display: 'flex' }}>
      <label style={{ paddingLeft: 8, fontSize: 'var(--font-size-body)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
        {label}
      </label>

      <div
        style={{
          alignSelf: 'stretch',
          padding: 16,
          background: 'var(--color-white)',
          borderRadius: 21,
          border: error ? '2px solid red' : 'none',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <select
          name={name}
          value={value}
          onChange={onChange}
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            background: 'transparent',
            fontSize: 18,
            fontFamily: 'var(--font-body)',
          }}
        >
          <option value="">Select a category</option>
          {options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div
          style={{ color: "red", marginTop: 6, marginLeft: 8, fontSize: 14 }}
        >
          {errorMessage || "This field is required."}
        </div>
      )}
    </div>
  );
}

