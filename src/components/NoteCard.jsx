import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import MarkdownView from 'react-showdown';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

function NoteCard(props) {
  const navigate = useNavigate();
  return (
    <div className="note--card">
      <div className="note--content">
        <MarkdownView markdown={parse(props.note)} />
      </div>
      <sub>Created: {new Date(props.createdAt).toDateString()}</sub>
      <div className="note--card--footer">
        {' '}
        <p onClick={() => navigate(`${props._id}`)} title="open note">
          View
        </p>
        <AiFillDelete
          className="icon"
          title="delete note"
          onClick={() => props.deleteNote(props._id)}
        />
      </div>
    </div>
  );
}

export default NoteCard;
