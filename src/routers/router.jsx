import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/page/Home";
import App from "../App";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import Videos from "../pages/Testimonies/Videos/Videos";
import VideoDetails from "../pages/Testimonies/Videos/VideoDetail";
import Texts from "../pages/Testimonies/Text/Texts";
import InspirationalPics from "../pages/page/InspirationalPics";

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
        path: "video-testimonies",
        element: <Videos />,
      },
      {
        path: "video-testimonies/:videoId",
        element: <VideoDetails />,
      },
      {
        path: "written-testimonies",
        element: <Texts />,
      },
      {
        path: "inspirational-quotes",
        element: <InspirationalPics />,
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
