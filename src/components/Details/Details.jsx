import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";

function Details() {
  let { id } = useParams();
  let [movie, setMovie] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=b35cf3dbcd08fd7825107a79aa6eb1cb`
      )
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err);
      });
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="card mb-3 shadow-lg movie-card">
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="img-fluid rounded movie-image"
              alt={movie.original_title}
            />
          </div>

          <div className="col-md-8">
            <div className="card-body d-flex flex-column">
              <h2 className="card-title text-primary fw-bold">{movie.original_title}</h2>
              <p className="card-text text-muted">{movie.overview}</p>
              <p className="text-secondary">
                ⭐ Rating: {movie.vote_average} / 10
              </p>
              <p className="text-secondary">
                ⏳ Duration: {movie.runtime} minutes
              </p>
              <p className="text-secondary">
                📅 Release Date: {movie.release_date}
              </p>

              <Button
                className="mt-auto align-self-start"
                variant="primary"
                onClick={() => nav(-1)}
              >
                ⬅ Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
