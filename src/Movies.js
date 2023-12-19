import React from "react";
const Movies = (props) => {
  return (
    <>
      {props.movies.map((movie) => {
        return (
          <div className="movie" key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.openingText}</p>
            <h3>{movie.releaseDate}</h3>
          </div>
        );
      })}
    </>
  );
};

export default Movies;
