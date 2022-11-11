/**
 * Initilaize Rich Text Editor from React element
 */
import {
  HtmlEditor,
  Inject,
  RichTextEditorComponent,
  Toolbar,
} from '@syncfusion/ej2-react-richtexteditor';
import axios from 'axios';

import * as React from 'react';
import { AiFillSave } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/alert/Alert';
import CustomBtn from '../components/button/CustomBtn';
import {
  toggleAlert,
  editingNote,
  updateIsLoading,
} from '../features/note/noteSlice';
import parse from 'html-react-parser';
import MarkdownView from 'react-showdown';

function CreateNote() {
  const { showAlert, editNote } = useSelector((state) => state.note);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toolbarSettings = {
    items: [
      'Bold',
      'Italic',
      'Underline',
      'StrikeThrough',
      'FontName',
      'FontSize',
      'FontColor',
      'BackgroundColor',
      'LowerCase',
      'UpperCase',
      '|',
      'Formats',
      'Alignments',
      'OrderedList',
      'UnorderedList',
      'Outdent',
      'Indent',
      '|',
      'CreateLink',
      '|',
      'ClearFormat',
      'Print',
      'SourceCode',
      'FullScreen',
      '|',
      'Undo',
      'Redo',
    ],
  };

  // ********************
  const createNewNote = async () => {
    const textValue = document.getElementById('-value').value;
    dispatch(updateIsLoading(true));
    try {
      await axios.post(
        'https://note-saver.onrender.com/api/v1/notes',

        { note: `${textValue}` },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('token')
            )}`,
          },
        }
      );
      dispatch(updateIsLoading(false));
      navigate('/notes');
    } catch (error) {
      dispatch(toggleAlert(true));
      dispatch(updateIsLoading(false));
      console.log(error);
    }
  };
  // *******************************
  const editedNote = async () => {
    const textValue = document.getElementById('-value').value;
    dispatch(updateIsLoading(true));
    try {
      await axios.patch(
        `https://note-saver-api.herokuapp.com/api/v1/notes/${editNote.id}`,

        { note: `${textValue}` },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('token')
            )}`,
          },
        }
      );
      dispatch(
        editingNote({
          note: null,
          id: null,
          editing: null,
        })
      );
      dispatch(updateIsLoading(false));
      navigate('/notes');
    } catch (error) {
      dispatch(toggleAlert(true));
      dispatch(updateIsLoading(false));
      console.log(error);
    }
  };

  return (
    <>
      {showAlert && <Alert text="You cannot save an empty note" />}
      <RichTextEditorComponent height={1000} toolbarSettings={toolbarSettings}>
        <div>
          <MarkdownView
            markdown={parse(
              (editNote.editing && editNote.note) || 'Write a note here 😊 '
            )}
          />
        </div>

        <Inject services={[Toolbar, HtmlEditor]} />
      </RichTextEditorComponent>
      <CustomBtn
        icon={<AiFillSave />}
        visit={editNote.editing ? editedNote : createNewNote}
      />
    </>
  );
}
export default CreateNote;
