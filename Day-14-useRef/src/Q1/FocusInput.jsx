import React, { useRef, useState } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = '#e0f7fa';
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <input ref={inputRef} type="text" placeholder="Click the button to focus" />
      <br /><br />
      <button onClick={handleFocus}>Focus Input</button>
    
    </div>
  );
}

export default FocusInput;
