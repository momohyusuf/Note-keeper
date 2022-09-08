import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiNotebook } from 'react-icons/gi';

function Welcome() {
  const style = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    letterSpacing: '0.1rem',
    margin: '0.5em',
  };
  return (
    <div style={{ textAlign: 'center' }} className="content--container">
      <section>
        <section>
          <h1
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#cd0a07',
            }}
          >
            Note Keeper <GiNotebook />{' '}
          </h1>
          <h3>Access All Your Notes From Any Device</h3>
        </section>
        <section>
          <NavLink style={style} to="signup">
            {' '}
            Sign Up
          </NavLink>
          <span>/</span>
          <NavLink style={style} to="login">
            Log In
          </NavLink>
        </section>
      </section>
    </div>
  );
}

export default Welcome;
