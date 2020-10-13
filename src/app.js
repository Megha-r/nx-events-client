import React, { Suspense } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Overview, Query, Wrapper } from "./modules";
import Login from './pages/login/Login'

const Application = (props) => {
  return (
    <Router {...props}>
      <ApolloProvider client={client}>
        <Suspense fallback={<div> loading </div>}>
          <Switch>
            <Route exact path="/">
              <Suspense fallback={<div> loading </div>}>
                <Wrapper />
              </Suspense>
            </Route>
          </Switch>
        </Suspense>
      </ApolloProvider>
    </Router>
  );
};

export default Application;
