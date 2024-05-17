import { notes } from "../initialState";
import * as actionTypes from "../actions/actionTypes";
import {
  IActionTypes,
  IAddNoteDetail,
  INoteDetail,
  IState,
} from "../initialStateType";

const reducer = (state = notes, action: IActionTypes) => {
  const setNoteHandler = (state: IState, note: IAddNoteDetail) => {
    return {
      ...state,
      list: [
        ...state.list,
        {
          id: Math.floor(Math.random() * 1000000),
          ...note,
        },
      ],
    };
  };

  const updateNoteHandler = (state: IState, note: INoteDetail) => {
    return {
      ...state,
      list: state.list.map((list) =>
        list.id === note.id
          ? {
              ...note,
              title: note.title,
              description: note.description,
              createdAt: note.createdAt,
            }
          : list
      ),
    };
  };

  const deleteNoteHandler = (state: IState, noteId: number) => {
    return { ...state, list: state.list.filter((note) => note.id !== noteId) };
  };

  switch (action.type) {
    case actionTypes.action.SET_USER_EMAIL:
      return { ...state, userEmail: action.email };
    case actionTypes.action.ADD_NOTE:
      return setNoteHandler(state, action.note);
    case actionTypes.action.UPDATE_NOTE:
      return updateNoteHandler(state, action.note);
    case actionTypes.action.DELETE_NOTE:
      return deleteNoteHandler(state, action.id);
    case actionTypes.action.REMOVE_USER_SESSION:
      return { ...state, userEmail: "" };
    default:
      return state;
  }
};
export default reducer;
