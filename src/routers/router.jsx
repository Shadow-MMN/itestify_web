import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import App from "../App";
import Login from "../pages/auth/Login/Login";
import SignUp from "../pages/auth/SignUp/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import Videos from "../pages/Videos/Videos";
import VideoDetails from "../pages/Videos/VideoDetail";
import Texts from "../pages/Text/Texts";
import Quotes from "../pages/InspirationalPics/Quotes";
import TextDetails from "../pages/Text/TextDetails";
import QuoteDetails from "../pages/InspirationalPics/QuoteDetails";
import Category from "../pages/Category/Category";
import CategoryDetail from "../pages/Category/CategoryDetail";
import About from "../pages/Abouts/About";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "category/:categoryId",
        element: <CategoryDetail />,
      },
      {
        path: "video-testimonies",
        element: <Videos />,
      },
      {
        path: "video-testimonies/:videoId",
        element: <VideoDetails />,
      },
      {
        path: "text-testimonies",
        element: <Texts />,
      },
      {
        path: "text-testimonies/:textId",
        element: <TextDetails />,
      },
      {
        path: "quotes",
        element: <Quotes />,
      },
      {
        path: "quotes/:quoteId",
        element: <QuoteDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

export default router;
