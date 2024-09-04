import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface LongPressButtonProps {
  style?: React.CSSProperties; // Allow for additional styles to be passed in
}

const LongPressButton: React.FC<LongPressButtonProps> = ({ style }) => {
  const [pressTimer, setPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const startPressTimer = () => {
    const timer = setTimeout(() => {
      navigate('/settings');
    }, 4000); // Long press duration (1 second)
    setPressTimer(timer);
  };

  const clearPressTimer = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  useEffect(() => {
    return () => {
      if (pressTimer) clearTimeout(pressTimer); // Clean up on unmount
    };
  }, [pressTimer]);

  return (
    <button
      ref={buttonRef}
      onMouseDown={startPressTimer}
      onMouseUp={clearPressTimer}
      onMouseLeave={clearPressTimer}
      onTouchStart={startPressTimer}
      onTouchEnd={clearPressTimer}
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        backgroundColor: 'transparent',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        ...style,
      }}
    >
      S
    </button>
  );
};

export default LongPressButton;
