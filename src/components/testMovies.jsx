import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class TestMovies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie) => {
    let filterList = this.state.movies.filter((m) => m._id !== movie._id);
    return this.setState({ movies: filterList });
  };

  handleReset = () => {
    return this.setState({ movies: getMovies() });
  };

  render() {
    let moviesCount = this.state.movies.length;
    if (!moviesCount)
      return (
        <div>
          <p>There are no movies available</p>
          <button onClick={this.handleReset} className="btn-warning">
            Reset
          </button>
        </div>
      );
    return (
      <React.Fragment>
        <h1>Test Vidify</h1>
        <p className="bg-primary">
          Currently {moviesCount} movies available in the market
        </p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Genre</th>
              <th>In Stock</th>
              <th>Rental Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default TestMovies;
