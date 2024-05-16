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
interface INoteUpdatedDetail {
    id: number;
    title: string;
    description: string;
    isUpdated: boolean;
}
function Notes(props: IProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isNoteUpdatedDetail, setNoteUpdatedDetail] = useState<INoteUpdatedDetail>({ id: 0, title: '', description: '', isUpdated: false });


    const handleOpenCloseModal = () => {
        setIsModalOpen(!isModalOpen)
        setNoteUpdatedDetail({ ...isNoteUpdatedDetail, isUpdated: false });
    };

    const getSpecificNoteById = (uniqueId: number) => {
        setIsModalOpen(!isModalOpen);
        const { id, title, description } = props.list.filter((note) => note.id === uniqueId)[0];
        setNoteUpdatedDetail({ ...isNoteUpdatedDetail, id, title, description, isUpdated: !isNoteUpdatedDetail.isUpdated });
    }
    return (
        <Background>
            <DialogBox {...isNoteUpdatedDetail} isOpen={isModalOpen} openCloseModal={handleOpenCloseModal} />
            <Card width={"100%"}>
                <Button type="button" label={<><AddIcon />Add Note</>} trigger={handleOpenCloseModal} />
                <Grid container className={NoteStyle.notesContainer}>
                    {props.list.length > 0 ? props.list.map((note, index) => (
                        <SingleNote
                            {...note}
                            handleSpecificNote={getSpecificNoteById}
                            key={note.id} />
                    )) : <Grid item width={"100%"}>
                        <Typography variant='h3' textAlign={"center"}>Notes not found 😀</Typography>
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