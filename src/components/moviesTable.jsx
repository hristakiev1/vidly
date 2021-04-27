import React, { Component } from "react";
import { Link } from "react-router-dom";
import LikeButton from "./common/likebutton";
import auth from "../services/userService";

import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      key: "#",
      label: "#",
      // content: (movie) => {
      //   return this.props.moviesPerPage.indexOf(movie) + 1;
      // },
    },
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "In Stock" },
    { path: "dailyRentalRate", label: "Rate" },

    {
      path: "liked",
      label: "Favorite",
      content: (movie) => (
        <LikeButton
          onLike={() => this.props.onLike(movie)}
          liked={movie.liked}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    label: "Status",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-big"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, onSort, sortColmn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        onSort={onSort}
        sortColmn={sortColmn}
      />
    );
  }
}

export default MoviesTable;
