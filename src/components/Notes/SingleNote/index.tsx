import React from 'react'
import { Grid, Typography } from '@mui/material'
import SingleNoteStyle from "./SingleNote.module.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { deleteNote } from '../../../store/actions/crud';
import { connect } from 'react-redux';

interface IProps {
  id: number;
  title: string;
  createdAt: string;
  handleSpecificNote: (id: number) => void;
  removeNote?: (noteId: number) => void;
}

function SingleNote(props: IProps) {
  const { id, title, createdAt, handleSpecificNote, removeNote } = props;

  const handlerSpecificNote = () => handleSpecificNote(id);

  const removeNoteHandler = () => removeNote && removeNote(id);
  return (
    <Grid item className={SingleNoteStyle.singleNoteContainer}>
      <RemoveCircleIcon className={SingleNoteStyle.removeIcon} onClick={removeNoteHandler} />
      <Grid item className={SingleNoteStyle.header} onClick={handlerSpecificNote}>
        <Grid item className={SingleNoteStyle.identifierFirstLetter}>
          {title.slice(0, 1)}
        </Grid>
        <Typography variant='inherit' className={SingleNoteStyle.title}>
          {title}
        </Typography>
      </Grid>
      <Typography variant='inherit' className={SingleNoteStyle.timestamp}>
        <CalendarMonthIcon className={SingleNoteStyle.icon} /> {createdAt}
      </Typography>
    </Grid>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    removeNote: (noteId: number) => dispatch(deleteNote(noteId))
  };
};

export default connect(null, mapDispatchToProps)(SingleNote)