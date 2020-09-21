import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from "../components/Layout";
import Posts from "../pages/Posts";
import Users from "../pages/Users";
import NotFound from "../pages/NotFound";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => (
  <BrowserRouter>
    <CssBaseline>
      <Layout>
        <Switch>
          <Redirect exact from="/" to="/posts" />
          <Route exact path="/users" component={Users} />
          <Route exact path="/posts" component={Posts} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </CssBaseline>
  </BrowserRouter>
);

export default App;
