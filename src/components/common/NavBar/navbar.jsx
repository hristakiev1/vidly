import { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Vidly
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link" to="/movies">
                Movies
              </NavLink>

              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>

              <NavLink className="nav-link" to="/rentals">
                Rentals
              </NavLink>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
