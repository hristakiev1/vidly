import _ from "lodash";

export function genreFilter(items, currentGenre) {
  return _(items)
    .filter((m) => m.genre.name === currentGenre)
    .take(items)
    .value();
}
