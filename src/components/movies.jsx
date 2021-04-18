import React, { Component } from "react";
import GenreList from "./common/genreList";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { Link } from "react-router-dom";
import {SearchBar} from "../utils/searchBar";
import _ from "lodash";

//import { genreFilter } from "../utils/genreFilter";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    itemsPerPage: 8,
    searchQuery: "",
    searchQuery2: "",
    selectedGenre: null,
    sortColmn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
   
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    deleteMovie(movie._id);
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColmn) => {
    this.setState({ sortColmn });
  };

  getPagedData = () => {
    const {
      itemsPerPage,
      currentPage,
      sortColmn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;

   
    
    if (searchQuery) 
    filtered = allMovies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    else if(selectedGenre && selectedGenre._id)
    filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id); 
    
    const sorted = _.orderBy(filtered, [sortColmn.path], [sortColmn.order]);
    
    const movies = paginate(sorted, itemsPerPage, currentPage );
 
    
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    
    const { length: count} = this.state.movies;
    const { itemsPerPage, currentPage, sortColmn, searchQuery } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();
   
    return (
      <div className="row">
        <div className="col-3">
          <GenreList
            genres={this.state.genres}
            selectedGenre={this.state.selectedGenre}
            onGenreSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>

          <SearchBar 
          value={searchQuery}
          placeholder="search..."
          onChange={this.handleSearch}

          />
          <MoviesTable
            movies={movies}
            sortColmn={sortColmn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

//   state = {
//     movies: [],
//     genres: [],
//     itemsPerPage: 4,
//     currentPage: 1,
//     sortColmn: { path: "title", order: "asc" },
//   };

//   componentDidMount() {
//     const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

//     this.setState({ movies: getMovies(), genres });
//   }

//   handleDelete = (movie) => {
//     let moviesFilter = this.state.movies.filter((m) => m._id !== movie._id);
//     return this.setState({ movies: moviesFilter });
//   };

//   handleReset = () => {
//     return this.setState({ movies: getMovies() });
//   };

//   handleLike = (movie) => {
//     let copyMovies = [...this.state.movies];
//     let index = copyMovies.indexOf(movie);

//     //copyMovies[index] = { ...copyMovies[index] };

//     copyMovies[index].liked = !copyMovies[index].liked;
//     this.setState({ movies: copyMovies });
//   };

//   handlePageChange = (page) => {
//     return this.setState({ currentPage: page });
//   };

//   handleGenreSelect = (genre) => {
//     return this.setState({ selectedGenre: genre, currentPage: 1 });
//   };

//   handleSort = (sortColmn) => {
//     return this.setState({ sortColmn });
//   };

//   getPagedData() {
//     const {
//       movies,
//       itemsPerPage,
//       currentPage,
//       selectedGenre,
//       sortColmn,
//     } = this.state;

//     let filterByGenre =
//       selectedGenre && selectedGenre._id
//         ? movies.filter((m) => m.genre._id === selectedGenre._id)
//         : movies;
//     const sortedList = _.orderBy(
//       filterByGenre,
//       [sortColmn.path],
//       [sortColmn.order]
//     );
//     const moviesPerPage = paginate(sortedList, itemsPerPage, currentPage);
//     return { filterByGenre, moviesPerPage };
//   }

//   render() {
//     const {
//       movies,
//       itemsPerPage,
//       currentPage,
//       sortColmn,
//       selectedGenre,
//     } = this.state;

//     if (!movies.length) return this.emptyPage();

//     const { filterByGenre, moviesPerPage } = this.getPagedData();

//     return (
//       <div>
//         <h1>Vidly Project</h1>
//         {console.log(this.state.movies)}
//         <div className="row">
//           <div className="col-2">
//             <GenreList
//               genres={this.state.genres}
//               onGenreSelect={this.handleGenreSelect}
//               selectedGenre={selectedGenre}
//             />
//           </div>
//           <div className="col">
//             <Link className="btn btn-primary mb-2" to="/movies/new">
//               Add Movie
//             </Link>
//             <h3 style={{ color: "white" }} className="bg-success">
//               Shows {filterByGenre.length} movies in the database
//             </h3>
//             <MoviesTable
//               moviesPerPage={moviesPerPage}
//               filterByGenre={filterByGenre}
//               onDelete={this.handleDelete}
//               onLike={this.handleLike}
//               onSort={this.handleSort}
//               sortColmn={sortColmn}
//             />
//             <Pagination
//               itemsCount={filterByGenre.length}
//               itemsPerPage={itemsPerPage}
//               currentPage={currentPage}
//               onPageChange={this.handlePageChange}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   emptyPage() {
//     return (
//       <span>
//         <h1 className="bg-warning">There are no movies available! </h1>
//         <button
//           className="btn btn-pill badge-secondary"
//           onClick={this.handleReset}
//         >
//           Reset
//         </button>
//       </span>
//     );
//   }
// }

export default Movies;
