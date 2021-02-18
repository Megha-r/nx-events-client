import {
  gql
} from 'apollo-boost';

const GET_PROFILE = gql`
  mutation getEmployeeById($employeeId: ID!) {
    getEmployeeById(payload: { employeeId: $employeeId }) {
      employeeId
      employeeName
      email
      userType
      employeeNumber
    }
  }
`;

export default GET_PROFILE;