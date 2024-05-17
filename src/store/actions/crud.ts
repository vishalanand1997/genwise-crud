import { IAddNoteDetail, INoteDetail } from "../initialStateType";
import * as actionTypes from "./actionTypes";

export const setUserEmailId = (email: string) => {
  return {
    type: actionTypes.action.SET_USER_EMAIL,
    email,
  };
};

export const removeUserSession = () => {
  return {
    type: actionTypes.action.REMOVE_USER_SESSION,
  };
};

export const setNote = (note: IAddNoteDetail) => {
  return {
    type: actionTypes.action.ADD_NOTE,
    note,
  };
};

export const editNote = (note: INoteDetail) => {
  return {
    type: actionTypes.action.UPDATE_NOTE,
    note,
  };
};

export const deleteNote = (id: number) => {
  return {
    type: actionTypes.action.DELETE_NOTE,
    id,
  };
};
