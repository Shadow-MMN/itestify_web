import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import App from "../App";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import Videos from "../pages/Testimonies/Videos/Videos";
import VideoDetails from "../pages/Testimonies/Videos/VideoDetail";
import Texts from "../pages/Testimonies/Text/Texts";
import Quotes from "../pages/InspirationalPics/Quotes";
import TextDetails from "../pages/Testimonies/Text/TextDetails";
import QuoteDetails from "../pages/InspirationalPics/QuoteDetails";
import Category from "../pages/Category/Category";
import CategoryDetail from "../pages/Category/CategoryDetail";
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
        element: <h1>About Us</h1>,
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
