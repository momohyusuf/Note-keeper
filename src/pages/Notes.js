import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomBtn from '../components/button/CustomBtn';

import Navbar from '../components/navbar/Navbar';
import NoteCard from '../components/NoteCard';
import { IoIosCreate } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';
import { updateIsLoading } from '../features/note/noteSlice';

const url = 'https://note-saver.onrender.com/api/v1/notes';

function Notes() {
  const [userNotes, setUserNotes] = useState(null);
  const { firstName, lastName, isLoading, searchString } = useSelector(
    (state) => state.note
  );
  const styles = {
    textAlign: 'center',
    padding: '2em 1em',
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get all the notes created by a particular user
  const getAllNotes = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      const {
        data: { notes },
      } = response;
      setUserNotes(notes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllNotes();
  }, []);

  // ********************
  // delete note function
  const deleteNote = async (id) => {
    dispatch(updateIsLoading(true));
    try {
      await axios.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      dispatch(updateIsLoading(false));
      window.location.reload(true);
    } catch (error) {
      dispatch(updateIsLoading(false));
      console.log(error);
    }
  };

  // ********************

  // navigate to create note page when clicked
  const createNoteRouterLink = () => {
    navigate('/createnote');
  };
  // ********************
  if (isLoading) {
    return <Spinner />;
  }

  if (userNotes === null) {
    return <Spinner />;
  }
  const filteredNotes = userNotes.filter((item) =>
    item.note.includes(searchString.toLowerCase())
  );
  if (userNotes.length === 0) {
    return (
      <div>
        <Navbar firstName={firstName} lastName={lastName} />
        <div className="no--note--created">
          <h4>You haven't created any note yet </h4>
          <button onClick={createNoteRouterLink}>Get Started</button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Navbar firstName={firstName} lastName={lastName} />
      {filteredNotes.length === 0 ? (
        <div className="no--note--created">
          <h4>Sorry no note found</h4>
        </div>
      ) : (
        <>
          <h3 style={styles}>All Notes</h3>
          <section className="maximum--width notes--container">
            {filteredNotes.reverse().map((item) => (
              <NoteCard key={item._id} {...item} deleteNote={deleteNote} />
            ))}
          </section>
          <CustomBtn icon={<IoIosCreate />} visit={createNoteRouterLink} />
        </>
      )}
    </main>
  );
}

export default Notes;
