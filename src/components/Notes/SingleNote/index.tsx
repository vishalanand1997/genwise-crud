import React from 'react'
import { Grid, Typography } from '@mui/material'
import SingleNoteStyle from "./SingleNote.module.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface IProps {
  id: number;
  title: string;
  createdAt: string;
  handleSpecificNote: (id: number) => void;
}

function SingleNote(props: IProps) {
  const { id, title, createdAt, handleSpecificNote } = props;

  const handlerSpecificNote = () => handleSpecificNote(id);

  return (
    <Grid item className={SingleNoteStyle.singleNoteContainer} onClick={handlerSpecificNote}>
      <Grid item className={SingleNoteStyle.header}>
        <Grid item className={SingleNoteStyle.identifierFirstLetter}>
          {title.slice(0, 1)}
        </Grid>
        <Typography variant='inherit' className={SingleNoteStyle.title}>
          {title}
        </Typography>
      </Grid>
      <Typography variant='inherit' className={SingleNoteStyle.timestamp}>
        <CalendarMonthIcon className={SingleNoteStyle.calenderIcon} /> {createdAt}
      </Typography>
    </Grid>
  )
}

export default SingleNote