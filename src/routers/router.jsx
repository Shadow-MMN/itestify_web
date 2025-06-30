import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import App from "../App";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VideoTestimoniesPage from "../pages/VideoTestimoniesPage";
import WrittenTestimoniesPage from "../pages/WrittenTestimoniesPage";
import InspirationalQuotesPage from "../pages/InspirationalQuotesPage";
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
        element: <VideoTestimoniesPage />,
      },
      {
        path: "written-testimonies",
        element: <WrittenTestimoniesPage />,
      },
      {
        path: "inspirational-quotes",
        element: <InspirationalQuotesPage />,
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
