import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: JSON.parse(localStorage.getItem('firstName')) || '',
  lastName: JSON.parse(localStorage.getItem('lastName')) || '',
  token: JSON.parse(localStorage.getItem('token')) || '',
  isLoading: null,
  showAlert: false,
  editNote: {
    id: null,
    note: null,
    editing: null,
  },
  searchString: '',
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    updateFirstName: (state, { payload }) => {
      state.firstName = payload;
    },
    updateLastName: (state, { payload }) => {
      state.lastName = payload;
    },
    updateIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    toggleAlert: (state, { payload }) => {
      state.showAlert = payload;
    },
    editingNote: (state, { payload }) => {
      state.editNote = payload;
    },
    filterNote: (state, { payload }) => {
      state.searchString = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateFirstName,
  updateLastName,
  updateIsLoading,
  toggleAlert,
  editingNote,
  filterNote,
} = noteSlice.actions;

export default noteSlice.reducer;
