import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import DetailsPokemon from "../DetailsPokemon.jsx";
import NoMatch from "../NoMatch.jsx";
import Root from "../Root.jsx";
import Login from "../Login.jsx";
import Favorites from "../Favorites.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NoMatch />,
    children: [
      {path: "/", element: <App />},
      {path: "/pokemon/:id", element: <DetailsPokemon />},
      {path: "/login", element: <Login />},
      {path: "/favorites", element: <Favorites />}
    ]},
]);

export default Router;
