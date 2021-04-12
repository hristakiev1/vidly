import React from "react";

const GenreList = (props) => {
  const {
    genres,
    textProperty,
    valueProperty,
    onGenreSelect,
    selectedGenre,
  } = props;
  return (
    <div>
      <ul className="list-group">
        {genres.map((g) => (
          <li
            key={g[valueProperty]}
            className={
              g === selectedGenre
                ? "clickable list-group-item active"
                : "clickable list-group-item"
            }
            onClick={() => onGenreSelect(g)}
          >
            {g[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};

GenreList.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default GenreList;
