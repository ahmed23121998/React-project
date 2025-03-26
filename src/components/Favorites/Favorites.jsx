import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../redux/favoritesSlice";

function Favorites() {


    const favorites = useSelector((state) => state.favorites.favorites);
    console.log(favorites);
    const dispatch = useDispatch();

    return (
        <>

            <h1 className="text-center my-5">Favorites</h1>
            <div className="container mt-5">
                <div className="row ">
                    {favorites.length > 0 ? (
                        favorites.map((movie) => (
                            <div className="col-md-4 col-lg-3 mb-4" key={movie.id}>
                                <div className="card h-100 shadow">
                                    <img
                                        src={
                                            movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                : "https://via.placeholder.com/500x750?text=No+Image"
                                        }
                                        className="card-img-top"
                                        alt={movie.title || "No Image Available"}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="badge bg-primary">
                                                {movie.release_date
                                                    ? movie.release_date.split("-")[0]
                                                    : "N/A"}
                                            </span>
                                            <span className="badge bg-warning text-dark">
                                                <i className="bi bi-star-fill me-1"></i>
                                                {movie.vote_average
                                                    ? movie.vote_average.toFixed(1)
                                                    : "N/A"}
                                            </span>
                                        </div>
                                        <p className="card-text small text-muted">
                                            {movie.overview.length > 100
                                                ? `${movie.overview.substring(0, 150)}...`
                                                : movie.overview}
                                        </p>
                                    </div>

                                    <div className="card-footer d-flex justify-content-between align-items-center">


                                        <button
                                            className="btn"
                                            onClick={() => dispatch(toggleFavorite(movie))}
                                            style={{
                                                color: favorites.includes(movie.id) ? "red" : "gray",
                                                backgroundColor: "#f8f9fa",
                                                borderRadius: "50%",
                                                padding: "0.5rem",
                                            }}
                                        >
                                            <i class="bi bi-trash3 text-danger" onClick={() => dispatch(remove(movie))}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted">No movies found.</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Favorites;
