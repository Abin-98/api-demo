import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
const Movies = (props) => {    
const [deleting, setDeleting]=useState(false);

const onDelete=async(e)=>{
  setDeleting(true);
  const id=e.target.id;
  try {
    const response=await fetch(`https://fir-project-b7f8c-default-rtdb.firebaseio.com/movies/${id}.json`,{
      method:'DELETE',
    })
    if (!response.ok) {
      throw new Error("Something went wrong...");
    }
    const data = await response.json();
    console.log(data);
  props.getMovies();
  } catch (error) {
    console.log(error.message);
  }
  setDeleting(false);
}

  return (
    <>
      {props.movies.map((movie) => {
        return (
          <div className="movie" key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.openingText}</p>
            <h3>{movie.releaseDate}</h3>
            <Button onClick={onDelete} variant="danger" id={movie.id} >Delete</Button>{deleting && <Spinner animation="border" size="sm" />}
          </div>
        );
      })}
    </>
  );
};

export default Movies;
