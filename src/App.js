import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import Movies from "./Movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);
  
  const fetchMovies=useCallback(async()=> {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film/");
      if (!response.ok) {
        setRetry(true);
        throw new Error("Something went wrong...");
      }
      setRetry(false);
      const data = await response.json();

      const newMovieData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(newMovieData);
    } catch (error) {
      console.log("inside fetchMovies")
      setError(error.message);
      setIsLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchMovies();
    console.log("first useEffect")
  }, [fetchMovies]);

  useEffect(() => {
    let id;
    if (retry) {
      console.log("inside useEffect 2, retry status: "+retry);
      id = setTimeout(() => {
        fetchMovies();
      }, 2000);
    }
    return () => {
      clearTimeout(id);
    };
  });

  const onCancelRetry = () => {
    setRetry(false);
  };

  let content = <p>Found no movies.</p>;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = (
      <span>
        {error}
        {retry && (
          <span>
            Retrying <Spinner animation="border" size="sm" />
          </span>
        )}
        <Button variant="warning" onClick={onCancelRetry}>
          Cancel
        </Button>
      </span>
    );
  }
  if (movies.length > 0) {
    content = <Movies movies={movies} />;
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={1} className="colm">
            <Button className="btn" variant="primary" onClick={fetchMovies}>
              Fetch
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="colm" sm={10}>
            {content}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
