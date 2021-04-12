import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/common/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import WelcomePage from "./components/pages/welcomepage";
import NotFound from "./components/pages/notfound";
import Navbar from "./components/common/NavBar/navbar";
import Customers from "./components/common/NavBar/customers";
import Rentals from "./components/common/NavBar/rentals";
import "./App.css";

//import TestMovies from "./components/testMovies";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
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
