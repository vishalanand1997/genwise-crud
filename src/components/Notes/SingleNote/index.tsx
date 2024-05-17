import React from "react";
import { Grid, Typography } from "@mui/material";
import SingleNoteStyle from "./SingleNote.module.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { deleteNote } from "../../../store/actions/crud";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

interface IProps {
  id: number;
  title: string;
  createdAt: string;
  handleSpecificNote: (id: number) => void;
  removeNote?: (noteId: number) => void;
  rearrageNoteBeforeInsertion: () => void;
}

function SingleNote(props: IProps) {
  const {
    id,
    title,
    createdAt,
    handleSpecificNote,
    removeNote,
    rearrageNoteBeforeInsertion,
  } = props;

  const handlerSpecificNote = () => handleSpecificNote(id);

  const removeNoteHandler = () => {
    rearrageNoteBeforeInsertion();
    removeNote && removeNote(id);
    toast.success("Note deleted!");
  };
  return (
    <Grid item className={SingleNoteStyle.singleNoteContainer}>
      <RemoveCircleIcon
        className={SingleNoteStyle.removeIcon}
        onClick={removeNoteHandler}
      />
      <Grid
        item
        className={SingleNoteStyle.header}
        onClick={handlerSpecificNote}
      >
        <Grid item className={SingleNoteStyle.identifierFirstLetter}>
          {title.slice(0, 1)}
        </Grid>
        <Typography variant="inherit" className={SingleNoteStyle.title}>
          {title.slice(0, 20)}
        </Typography>
      </Grid>
      <Typography variant="inherit" className={SingleNoteStyle.timestamp}>
        <CalendarMonthIcon className={SingleNoteStyle.icon} />{" "}
        {moment(createdAt).format("MMMM Do, YYYY h:mm a")}
      </Typography>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    removeNote: (noteId: number) => dispatch(deleteNote(noteId)),
  };
};

export default connect(null, mapDispatchToProps)(SingleNote);
