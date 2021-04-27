import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/userService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!auth.getUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                historyLocation: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
