import React from "react";
import { Mutation } from "@apollo/react-components";
import LOGIN_USER from "./Mutation";
import Login from "./Login";

export default () => (
  <Mutation mutation={LOGIN_USER}>
    {(loginEmployee) => (
      <>
        <Login loginEmployee={loginEmployee} />
      </>
    )}
  </Mutation>
);
