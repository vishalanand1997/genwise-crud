import { Grid } from "@mui/material";
import React from "react";
import style from "./LoginWithEmail.module.css";
import GenWiseImage from "../../assets/images/genwise.png"

interface IProps {
  children: React.ReactNode;
}
function Background(props: IProps) {
  return (
    <Grid item container className={style.login__container}>
      <Grid item lg={12} md={12} xs={12}>
        <img
          src={GenWiseImage}
          alt="genwise"
          className={style.logo_image}
        />
      </Grid>
      <Grid item lg={12} md={12} xs={12}>
        {props.children}
      </Grid>
    </Grid>
  );
}

export default Background;
