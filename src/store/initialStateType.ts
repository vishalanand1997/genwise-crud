import { action } from "./actions/actionTypes";

export interface INoteDetail {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}
export interface IState {
  userEmail: string;
  list: INoteDetail[];
}
export interface IActionUserEmail {
  type: action.SET_USER_EMAIL;
  email: string;
}
export interface IAddNoteDetail {
  title: string;
  description: string;
  createdAt: string;
}
export interface IAddNote {
  type: action.ADD_NOTE;
  note: IAddNoteDetail;
}
export interface IUpdateNote {
  type: action.UPDATE_NOTE;
  note: INoteDetail;
}
export interface IDeleteNote {
  type: action.DELETE_NOTE;
  id: number;
}
export interface IRemoveUserSession {
  type: action.REMOVE_USER_SESSION;
}
export type IActionTypes =
  | IAddNote
  | IUpdateNote
  | IDeleteNote
  | IRemoveUserSession
  | IActionUserEmail;
