import React from "react";
import { Mutation } from "@apollo/react-components";
import POST_TEAM from "./Mutation";
import AddTeam from "./PostTeam";

export default () => (
  <Mutation mutation={POST_TEAM}>
    {(postTeam) => (
      <>
        <AddTeam postTeam={postTeam} />
      </>
    )}
  </Mutation>
);
