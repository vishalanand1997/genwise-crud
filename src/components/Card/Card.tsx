import React from "react";
import { CardContent, Card as Cards } from "@mui/material";
import style from "./Card.module.css";
interface IProps {
  children: React.ReactNode;
  width: number | string;
  height?: number | string;
}
function Card(props: IProps) {
  const { children, width, height } = props;
  const cardContents = (
    <React.Fragment>
      <CardContent>{children}</CardContent>
    </React.Fragment>
  );
  return (
    <Cards
      variant="outlined"
      className={style.card_container}
      style={{ width: width, height: height }}
    >
      {cardContents}
    </Cards>
  );
}

export default Card;
