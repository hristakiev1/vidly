import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import auth from "./services/userService";
import Customers from "./components/common/NavBar/customers";
import Rentals from "./components/common/NavBar/rentals";
import MovieForm from "./components/common/movieForm";
import Navbar from "./components/common/NavBar/navbar";
import WelcomePage from "./components/pages/welcomepage";
import NotFound from "./components/pages/notfound";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Movies from "./components/movies";

import "./App.css";
import ProtectedRoute from "./components/common/protectedRoutes";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <Navbar user={user} />

        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" render={(props) => <Movies {...props} />} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={WelcomePage} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
