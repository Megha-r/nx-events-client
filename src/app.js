import React, { Suspense } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Overview, Query, LoginWrapper, AddTeamWrapper, ProfileWrapper, TeamList } from "./modules";
import Login from './pages/login/Login'
import AddEvents from './pages/event/addEvent'

const Application = (props) => {
  return (
    <ApolloProvider client={client}>
      {localStorage.getItem("token") ? (<Router {...props}>
        <Suspense fallback={<div> loading </div>}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/EventList" />
            </Route>
            <Route path="/EventList" component={Query} />
            <Route path="/AddTeam" component={AddTeamWrapper} />
            <Route path="/ListTeam" component={TeamList} />
            <Route path="/Profile" component={ProfileWrapper} />
          </Switch>
        </Suspense>

      </Router>
      ) : (<Router {...props}>
        <Suspense fallback={<div> loading </div>}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/Login" />
            </Route>
            <Route path="/Login" component={LoginWrapper} />
          </Switch>
        </Suspense>

      </Router>
        )
      }
    </ApolloProvider >
  );
};

export default Application;
