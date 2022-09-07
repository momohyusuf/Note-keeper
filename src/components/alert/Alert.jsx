import React from 'react';
import './alert.css';

function Alert({ text, icon }) {
  return (
    <div className="alert--box">
      <p>
        {text}
        {icon}
      </p>
    </div>
  );
}

export default Alert;
