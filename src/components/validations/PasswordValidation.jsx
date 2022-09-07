import React from 'react';
import { BsCheck2 } from 'react-icons/bs';
const PasswordValidation = ({ verify, text }) => {
  return (
    <small
      style={{
        color: `${verify ? 'green' : '#cd0a07'}`,
      }}
    >
      {' '}
      {verify && <BsCheck2 />} {text}
    </small>
  );
};

export default PasswordValidation;
