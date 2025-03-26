import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";
import { tokenContext } from "../../Context/token";
import { signOut } from "../../Services/Auth";
import toast from "react-hot-toast";

function NavBar() {
    const { isAuth, setIsAuth } = useContext(tokenContext);
    const navigate = useNavigate();

    const favorites = useSelector((state) => state.favorites.favorites);
    const favoritesCount = favorites.length;


    const handleProtectedRoute = (e, route) => {
        if (!isAuth) {
            e.preventDefault(); toast.error("Please You Should Login First"); setTimeout(() => navigate("/login"), 500);
        } else { navigate(route); }
    };

    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link"> Home </NavLink>
                        <NavLink to="/movies/1" className="nav-link" onClick={(e) => handleProtectedRoute(e, "/movies/1")}> Movies </NavLink>
                        {isAuth ? (
                            <NavLink onClick={() => {
                                localStorage.removeItem("user");
                                setIsAuth(false);
                                signOut();
                                toast.success("Logout Successfully");
                            }} to="/login" className="nav-link">Logout</NavLink>
                        ) : (
                            <>
                                <NavLink to="/login" className="nav-link"> Login </NavLink>
                                <NavLink to="/register" className="nav-link"> Register </NavLink>
                            </>
                        )}
                        <NavLink to="/favorite" className="nav-link" onClick={(e) => handleProtectedRoute(e, "/favorite")}>Favorites</NavLink>
                    </Nav>


                    <Link to="/favorite" className="btn position-relative">
                        <i className="bi bi-heart-fill" style={{ fontSize: "1.8rem", color: favoritesCount > 0 ? "red" : "gray" }}></i>
                        {favoritesCount > 0 && (
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style={{ fontSize: "0.8rem", padding: "2px 3px" }}
                            >
                                {favoritesCount}
                            </span>
                        )}
                    </Link>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
