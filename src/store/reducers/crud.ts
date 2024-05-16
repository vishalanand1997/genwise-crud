import { notes } from "../initialState";
import * as actionTypes from "../actions/actionTypes";
import { IActionTypes, IAddNoteDetail, INoteDetail, IState } from "../initialStateType";
import moment from 'moment';

const reducer = (state = notes, action: IActionTypes) => {

  const setNoteHandler = (state: IState, note: IAddNoteDetail) => {
    const current = moment()
    const noteDetail = {
      id: Math.floor(Math.random() * 1000000),
      createdAt: current.format('MMMM Do, YYYY h:mm a'),
      ...note,
    }
    return { ...state, list: [...state.list, noteDetail] }
  }
  const updateNoteHandler = (state: IState, note: INoteDetail) => {
    return {
      ...state, list: state.list.map((list) =>
        list.id === note.id ?
          { ...note, title: note.title, description: note.description, createdAt: note.createdAt }
          :
          list
      )
    };
  }
  switch (action.type) {
    case actionTypes.action.SET_USER_EMAIL:
      return { ...state, userEmail: action.email };
    case actionTypes.action.ADD_NOTE:
      return setNoteHandler(state, action.note);
    case actionTypes.action.UPDATE_NOTE:
      return updateNoteHandler(state, action.note);
    default:
      return state;
  }
};
export default reducer;
