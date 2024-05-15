import React, { useState } from 'react'
import Background from '../LoginWithEmail/Background';
import Card from "../Card/Card";
import SingleNote from './SingleNote';
import NoteStyle from "./Notes.module.css"
import { Grid, Typography } from '@mui/material';
import Button from '../Button/Button';
import AddIcon from '@mui/icons-material/Add';
import DialogBox from '../Modal';
import { INoteDetail, IState } from '../../store/initialStateType';
import { connect } from 'react-redux';

interface IProps {
    list: INoteDetail[]
}
function Notes(props: IProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isNoteUpdated, setNoteUpdated] = useState<boolean>(false);

    const handleOpenCloseModal = () => {
        setIsModalOpen(!isModalOpen)
        setNoteUpdated(false);
    };

    const getSpecificNoteById = (id: number) => {
        setNoteUpdated(!isModalOpen);
        setIsModalOpen(!isNoteUpdated);
        const selectedNoteDetail = props.list.filter((note) => note.id === id);
    }
    return (
        <Background>
            <DialogBox isUpdate={isNoteUpdated} isOpen={isModalOpen} openCloseModal={handleOpenCloseModal} />
            <Card width={"100%"}>
                <Button type="button" label={<><AddIcon />Add Note</>} trigger={handleOpenCloseModal} />
                <Grid container className={NoteStyle.notesContainer}>
                    {props.list.length > 0 ? props.list.map((note, index) => (
                        <SingleNote
                            {...note}
                            handleSpecificNote={getSpecificNoteById}
                            key={note.id} />
                    )) : <Grid item width={"100%"}>
                        <Typography variant='h3' textAlign={"center"}>No Notes found 😀</Typography>
                    </Grid>}
                </Grid>
            </Card>
        </Background>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        list: state.list,
    };
};

export default connect(mapStateToProps)(Notes);