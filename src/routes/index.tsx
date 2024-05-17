import React from "react";
import LoginWithEmail from "../components/LoginWithEmail/LoginWithEmail";
import Notes from "../components/Notes";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Wrapper,
} from "react-router-dom";
import { IState } from "../store/initialStateType";
import { connect } from "react-redux";

interface IProps {
  isAuthenticated?: boolean;
}
function Routes(props: IProps) {
  return (
    <BrowserRouter>
      <Wrapper>
        <Route path="/" element={<LoginWithEmail />}></Route>
        <Route
          path="notes"
          element={props?.isAuthenticated ? <Notes /> : <Navigate to="/" />}
        />
      </Wrapper>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    isAuthenticated: state.userEmail !== "",
  };
};
export default connect(mapStateToProps)(Routes);
