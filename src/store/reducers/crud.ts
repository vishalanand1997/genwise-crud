import { notes } from "../initialState";
import * as actionTypes from "../actions/actionTypes";
import { IActionTypes, IAddNoteDetail, IState } from "../initialStateType";
import moment from 'moment'

const reducer = (state = notes, action: IActionTypes) => {
  
  const setNoteHandler = (state: IState, note: IAddNoteDetail) => {
  const current= moment()
    const noteDetail = {
      id: Math.floor(Math.random() * 1000000),
      createdAt: current.format('MMMM Do, YYYY h:mm a'),
      ...note,
    }
    return { ...state, list: [...state.list, noteDetail] }
  }
  switch (action.type) {
    case actionTypes.action.SET_USER_EMAIL:
      return { ...state, userEmail: action.email };
    case actionTypes.action.SET_NOTE:
      return setNoteHandler(state, action.note)
    default:
      return state;
  }
};
export default reducer;
