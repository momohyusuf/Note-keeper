import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import MarkdownView from 'react-showdown';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import CustomBtn from '../components/button/CustomBtn';
import { AiFillEdit } from 'react-icons/ai';

import { editingNote } from '../features/note/noteSlice';
import Spinner from '../components/spinner/Spinner';

const url = 'https://note-saver-api.herokuapp.com/api/v1/notes';

function ReadNote() {
  const { noteId } = useParams();
  const [userNote, setUserNote] = useState(null);
  const { editNote } = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get a single note with the ID
  const getSingleNote = async (id) => {
    try {
      const response = await axios.get(`${url}/${noteId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      const {
        data: { note },
      } = response;
      setUserNote(note?.note);
    } catch (error) {
      console.log(error);
    }
  };
  // ******************
  // navigate to create note
  const createNote = async () => {
    dispatch(
      editingNote({
        note: userNote,
        id: noteId,
        editing: true,
      })
    );

    navigate('/createnote');
  };
  useEffect(() => {
    getSingleNote();
  }, []);
  // ******************
  if (userNote === null) {
    return <Spinner />;
  }

  return (
    <div className="single--note--container maximum--width">
      <MarkdownView markdown={parse(userNote)} />
      <CustomBtn icon={<AiFillEdit />} visit={createNote} />
    </div>
  );
}

export default ReadNote;
