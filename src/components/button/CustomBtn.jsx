import React from 'react';
import './customBtn.css';

function CustomBtn(props) {
  return (
    <div className="custom--button" onClick={() => props.visit()}>
      {props.icon}
    </div>
  );
}

export default CustomBtn;
