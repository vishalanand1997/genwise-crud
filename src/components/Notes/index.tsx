import React, { useEffect, useState } from "react";
import Background from "../LoginWithEmail/Background";
import Card from "../Card/Card";
import SingleNote from "./SingleNote";
import NoteStyle from "./Notes.module.css";
import { Grid, TextField, Typography } from "@mui/material";
import Button from "../Button/Button";
import AddIcon from "@mui/icons-material/Add";
import DialogBox from "../Modal";
import { INoteDetail, IState } from "../../store/initialStateType";
import { connect } from "react-redux";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

interface IProps {
  list: INoteDetail[];
}
interface INoteList {
  list: INoteDetail[];
  isAscNotes: boolean;
}
interface INoteUpdatedDetail {
  id: number;
  title: string;
  description: string;
  isUpdated: boolean;
  isShowDetail: boolean;
}
function Notes(props: IProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNoteUpdatedDetail, setNoteUpdatedDetail] =
    useState<INoteUpdatedDetail>({
      id: 0,
      title: "",
      description: "",
      isUpdated: false,
      isShowDetail: false,
    });
  const [noteList, setNoteList] = useState<INoteList>({
    list: props.list,
    isAscNotes: true,
  });

  const handleOpenCloseModal = () => {
    setIsModalOpen(!isModalOpen);
    setNoteUpdatedDetail({
      ...isNoteUpdatedDetail,
      isUpdated: false,
      isShowDetail: false,
    });
  };

  const getSpecificNoteById = (uniqueId: number) => {
    setIsModalOpen(!isModalOpen);
    const { id, title, description } = noteList.list.filter(
      (note) => note.id === uniqueId
    )[0];
    setNoteUpdatedDetail({
      ...isNoteUpdatedDetail,
      id,
      title,
      description,
      isShowDetail: !isNoteUpdatedDetail.isShowDetail,
    });
  };

  const sortNoteList = () => {
    let list: INoteDetail[] = noteList.list.sort((a, b) =>
      noteList?.isAscNotes
        ? +new Date(b.createdAt) - +new Date(a.createdAt)
        : +new Date(a.createdAt) - +new Date(b.createdAt)
    );
    setNoteList({ isAscNotes: !noteList?.isAscNotes, list });
  };

  const openEditNoteModal = () =>
    setNoteUpdatedDetail({
      ...isNoteUpdatedDetail,
      isUpdated: !isNoteUpdatedDetail.isUpdated,
      isShowDetail: !isNoteUpdatedDetail.isShowDetail,
    });

  const rearrageNoteBeforeInsertion = () =>
    setNoteList({
      list: noteList.list.sort(
        (a, b) => +new Date(a.createdAt) - +new Date(b.createdAt)
      ),
      isAscNotes: true,
    });

  const handleNoteSearch = (event: any) => {
    const searchedNote: any = noteList.list.find(
      (note) => note.title === event.target.value
    );
    if (searchedNote) {
      setNoteList({ list: [searchedNote], isAscNotes: true });
    } else {
      if (event.target.value === "") {
        setNoteList({ list: props.list, isAscNotes: true });
      }
    }
  };

  useEffect(() => {
    setNoteList({ list: props.list, isAscNotes: true });
  }, [props.list]);

  return (
    <Background>
      <DialogBox
        {...isNoteUpdatedDetail}
        isOpen={isModalOpen}
        openCloseModal={handleOpenCloseModal}
        openEditNoteModal={openEditNoteModal}
        rearrageNoteBeforeInsertion={rearrageNoteBeforeInsertion}
      />
      <Card width={"100%"}>
        <Grid item className={NoteStyle.noteActionsContainer}>
          <Button
            type="button"
            label={
              <>
                <AddIcon />
                Add Note
              </>
            }
            trigger={handleOpenCloseModal}
          />
          {noteList.list.length > 0 && (
            <>
              <TextField
                id="search"
                label="Search"
                variant="outlined"
                size={"small"}
                className={NoteStyle.noteSearchInput}
                onChange={handleNoteSearch}
              />
              <SortByAlphaIcon
                className={NoteStyle.noteSortingIcon}
                onClick={sortNoteList}
              />
            </>
          )}
        </Grid>
        <Grid container className={NoteStyle.notesContainer}>
          {noteList.list.length > 0 ? (
            noteList.list.map((note, index) => (
              <SingleNote
                {...note}
                handleSpecificNote={getSpecificNoteById}
                rearrageNoteBeforeInsertion={rearrageNoteBeforeInsertion}
                key={note.id}
              />
            ))
          ) : (
            <Grid item width={"100%"}>
              <Typography variant="h3" textAlign={"center"}>
                Notes not found 😀
              </Typography>
            </Grid>
          )}
        </Grid>
      </Card>
    </Background>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    list: state.list,
  };
};

export default connect(mapStateToProps)(Notes);
