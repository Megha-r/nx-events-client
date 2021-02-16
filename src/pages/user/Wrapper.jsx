import React from "react";
import { Mutation } from "@apollo/react-components";
import GET_PROFILE from "./Mutation";
import Profile from "./Profile";

export default () => (
  <Mutation mutation={GET_PROFILE}>
    {(getEmployeeById) => (
      <>
        <Profile getEmployeeById={getEmployeeById} />
      </>
    )}
  </Mutation>
);
