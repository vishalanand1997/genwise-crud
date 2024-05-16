import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';

import Button from "../Button/Button";

import style from "./Modal.module.css"
import { connect } from 'react-redux';
import { IAddNoteDetail, INoteDetail } from '../../store/initialStateType';
import { AnyAction, Dispatch } from 'redux';
import { editNote, setNote } from '../../store/actions/crud';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
    isUpdated?: boolean
    id: number;
    title: string;
    description: string;
    isOpen: boolean;
    openCloseModal: () => void;
    addNote?: (note: IAddNoteDetail) => void;
    updateNote?: (note: INoteDetail) => void;
}

interface IAddNote {
    title: string;
    description: string;
}
function DialogBox(props: IProps) {
    const { isOpen, openCloseModal, addNote, isUpdated = false, id, title, description, updateNote } = props;
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        reset
    } = useForm<IAddNote>();


    const handleAddNoteSubmit = (data: any) => {
        if (isUpdated) {
            console.log("data", data)
            const current = moment()
            updateNote && updateNote({ ...data, id, createdAt: current.format('MMMM Do, YYYY h:mm a') })
        } else {
            addNote && addNote(data);
        };
        openCloseModal();
        reset();
    }

    const openingClosingModal = () => {
        openCloseModal();
        reset();
    }

    React.useEffect(() => {
        if (isUpdated) {
            setValue("title", title);
            setValue("description", description);
        }
    }, [isUpdated])
    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={openingClosingModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{isUpdated ? "Edit" : "Add"} Note</DialogTitle>
                <DialogContent>
                    <DialogContentText className={style.dialog_container}>
                        <form onSubmit={handleSubmit(handleAddNoteSubmit)}>
                            <TextField
                                {...register("title", {
                                    required: "Ttile field is required",
                                })}
                                variant="outlined"
                                placeholder="Title"
                                label="Title"
                                autoFocus
                            />
                            <div className={style.error_container}>
                                {errors.title && (
                                    <span className={style.error__message}>
                                        {errors.title.message}
                                    </span>
                                )}
                            </div>

                            <TextField
                                {...register("description", {
                                    required: "Description field is required",
                                })}
                                variant="outlined"
                                placeholder="Description"
                                label="Description"
                            />
                            <div className={style.error_container}>
                                {errors.description && (
                                    <span className={style.error__message}>
                                        {errors.description.message}
                                    </span>
                                )}
                            </div>
                            <DialogActions className={style.footerActionButtons}>
                                <Button type='button' trigger={openingClosingModal} label={"Close"} />
                                <Button type="submit" label={isUpdated ? "Update" : "Add"} />
                            </DialogActions>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        addNote: (note: IAddNoteDetail) => dispatch(setNote(note)),
        updateNote: (note: INoteDetail) => dispatch(editNote(note)),
    };
};

export default connect(null, mapDispatchToProps)(DialogBox);