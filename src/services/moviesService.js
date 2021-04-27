import http from "./httpService";
import config from "../config.json";

function moviesApi() {
  return config.apiEndpoint + "/movies/";
}

const movies = async () => {
  const { data: movies } = await http.get(moviesApi());
  return movies;
};

export function getMovies() {
  return movies();
}

export function deleteMovie(id) {
  return http.delete(moviesApi() + id);
}

export async function getMovie(id) {
  const { data: movie } = await http.get(moviesApi() + id);
  return movie;
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = {
      ...movie,
    };
    delete body._id;
    await http.put(moviesApi() + movie._id, body);
  } else {
    await http.post(moviesApi(), movie);
  }
}
