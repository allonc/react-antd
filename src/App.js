import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { adminRoutes } from "./routes";
import Frame from "./components/Frame/index";
import "./App.scss"
function App() {
  return (
    <Frame>
      <Switch>
        {adminRoutes.map(route => {
          return (
            <Route
              path={route.path}
              key={route.path}
              exact={route.exact}
              render={routeProps => {
                return <route.component {...routeProps} />;
              }}
            />
          );
        })}
        <Redirect to="/404"/>
      </Switch>
    </Frame>
  );
}

export default App;
