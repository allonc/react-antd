import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { adminRoutes } from "./routes";
import Frame from "./components/Frame/index";
import { isLogined } from "./utils/auth";
import { AppProvider } from "./useContext/store";

import "./App.less";
function App() {
  return isLogined() ? (
    <AppProvider>
      <Frame>
        <Switch>
          {adminRoutes.map((route) => {
            return (
              <Route
                path={route.path}
                key={route.path}
                exact={route.exact}
                render={(routeProps) => {
                  return <route.component {...routeProps} />;
                }}
              />
            );
          })}
          <Redirect to={adminRoutes[0].path} from="/admin" />
          <Redirect to="/404" />
        </Switch>
      </Frame>
    </AppProvider>
  ) : (
    <Redirect to="/login" />
  );
}

export default App;
