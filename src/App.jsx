import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import MovieCards from "./components/MoviesCards/MoviesCards";
import Details from "./components/Details/Details";
import Login from "./components/Login/Login";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import Favorites from "./components/Favorites/Favorites";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Guard from "./components/Guard/Guard";
import { TokenProvider } from "./Context/token";
import { Toaster } from "react-hot-toast";
import React, { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("user") ? true : false);
  return (

    <TokenProvider value={{ isAuth, setIsAuth }}>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MovieCards />} />
            <Route path="movies/:page"element={<Guard><MovieCards /></Guard>}/>
            <Route path="/Login" element={<Login />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/favorite" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" reverseOrder={false}/>
      </Provider>

    </TokenProvider>

  );
}

export default App;
