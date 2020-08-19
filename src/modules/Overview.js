import React from 'react';
import { withRouter } from 'react-router-dom';

function Overview({ history, ...rest }) {
  return (<div>Welcome</div>)
}

export default withRouter(Overview);
