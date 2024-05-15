import React, { Fragment } from "react";
import style from "./Button.module.css";
import { Button as ButtonMUI } from "@mui/material";
interface IProps {
  type: "submit" | "button";
  label: React.ReactNode | string;
  trigger?: () => void;
  variant?: "contained" | "outlined";
}
function Button(props: IProps) {
  const { label, type, trigger, variant = "contained" } = props;
  return (
    <Fragment>
      <ButtonMUI
        type={type}
        variant={variant}
        className={variant === "contained" ? style.btn : ""}
        onClick={trigger}
      >
        {label}
      </ButtonMUI>
    </Fragment>
  );
}

export default Button;
