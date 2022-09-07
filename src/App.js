import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SharedLayout from './components/SharedLayout';
import Notes from './pages/Notes';
import CreateNote from './pages/CreateNote';
import ReadNote from './pages/ReadNote';
import Welcome from './pages/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';

import { toggleAlert } from './features/note/noteSlice';

function App() {
  const { showAlert } = useSelector((state) => state.note);
  const dispatch = useDispatch();
  // clear out the alert modal after 2 secs
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(toggleAlert(false));
    }, 2000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [showAlert]);
  // **************
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Welcome />} />

        <Route path="notes" element={<Notes />} />

        <Route path="createnote" element={<CreateNote />} />
        <Route path="notes/:noteId" element={<ReadNote />} />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
