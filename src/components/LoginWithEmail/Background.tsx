import { Grid, Typography } from "@mui/material";
import React from "react";
import style from "./LoginWithEmail.module.css";
import GenWiseImage from "../../assets/images/genwise.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { IState } from "../../store/initialStateType";
import { removeUserSession } from "../../store/actions/crud";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
  isSession?: boolean;
  deleteUserSession?: () => void;
}
function Background(props: IProps) {
  const navigate = useNavigate();

  const removeSessionHandler = () => {
    if (props?.deleteUserSession) {
      props?.deleteUserSession();
      navigate("/");
    }
  };
  return (
    <Grid item container className={style.login__container}>
      <Grid item lg={12} md={12} xs={12} className={style.headerContainer}>
        <img src={GenWiseImage} alt="genwise" className={style.logo_image} />
        {props?.isSession ? (
          <Typography
            component={"a"}
            className={style.logoutBtn}
            onClick={removeSessionHandler}
          >
            Logout <ExitToAppIcon />
          </Typography>
        ) : null}
      </Grid>
      <Grid item lg={12} md={12} xs={12}>
        {props.children}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    isSession: state.userEmail !== "",
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    deleteUserSession: () => dispatch(removeUserSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Background);
