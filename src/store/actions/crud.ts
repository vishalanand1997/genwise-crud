import { IAddNoteDetail } from "../initialStateType";
import * as actionTypes from "./actionTypes";

export const setUserEmailId = (email: string) => {
  return {
    type: actionTypes.action.SET_USER_EMAIL,
    email,
  };
};

export const setNote = (note: IAddNoteDetail) => {
  return {
    type: actionTypes.action.SET_NOTE,
    note,
  };
};
