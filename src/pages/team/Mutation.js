import {
    gql
} from 'apollo-boost';

const POST_TEAM = gql`
    mutation postTeam($teamName: String!, $description: String!) {
      postTeam(payload:{teamName: $teamName, description: $description})
      {
      teamId
      teamName
    description
  }
    }
  `;

export default POST_TEAM;
