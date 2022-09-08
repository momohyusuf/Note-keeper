import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterNote } from '../../features/note/noteSlice';
import './navbar.css';

function Navbar({ firstName, lastName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <nav>
      <section className="maximum--width navbar">
        <input
          type="text"
          name="searchNote"
          id="searchNote"
          placeholder="Search for a note"
          onChange={(e) => dispatch(filterNote(e.target.value))}
        />
        <div>
          <p style={{ textTransform: 'capitalize' }}>
            {firstName.slice(0, 1)}. {lastName}
          </p>
          <button
            style={{ marginTop: '0.3em', padding: '0.3rem' }}
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
