import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Movies from "./Movies";

function App() {
  const [movies, setMovies] = useState([]);
  function fetchMovies() {
    fetch("https://swapi.dev/api/films/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const newMovieData = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(newMovieData);
      });
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={7} className="colm">
            <Button className="btn" variant="primary" onClick={fetchMovies}>
              Fetch
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={10}>
            <Movies movies={movies} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
