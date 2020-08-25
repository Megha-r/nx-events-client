import React, { Suspense } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Overview, Query } from "./modules";

const Application = (props) => {
  return (
    <Router {...props}>
      <ApolloProvider client={client}>
        <Suspense fallback={<div> loading </div>}>
          <Switch>
            <Route exact path="/">
              <Suspense fallback={<div> loading </div>}>
                <Query />
              </Suspense>
            </Route>
          </Switch>
        </Suspense>
      </ApolloProvider>
    </Router>
  );
};

export default Application;
