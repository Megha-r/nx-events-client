import React from "react";
import {
  gql
} from 'apollo-boost';
import { graphql } from "@apollo/react-hoc";
import Compose from "lodash.flowright";

function Profile(props) {
  const { data: { getMyProfile = {} } = {} } = props;
  console.log("profile", getMyProfile);
  const { name, email, id } = getMyProfile;
  console.log("data", name, email, id);
  if (getMyProfile) {
    return (<div>
      <p>
        {name}
      </p>
      <p>
        {id}
      </p>
      <p>
        {email}
      </p>
    </div>)
  }
  return (<p>well</p>)
}

const GET_MYPROFILE = gql`
    query getMyProfile{
      getMyProfile{
        id,
        email,
        name
      }
    }
  `;

export default Compose(
  graphql(GET_MYPROFILE, {})
)(Profile);
