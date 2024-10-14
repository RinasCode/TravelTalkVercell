import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import React from "react";
import BaseLayout from "../views/BaseLayout";
import { SimpleRegistrationForm } from "../views/RegisterPage";
import { SimpleLoginForm } from "../views/LoginPage";
import HomePage from "../views/HomePage";
import AddReview from "../views/AddReview";
import EditReview from "../views/EditReview";
import MyReviewPage from "../views/MyReviewPage";
import RecomendationHotel from "../views/HotelRecomendation";
import HotelList from "../views/ResultGemini";
import Toastify from "toastify-js";

const url = "https://travel-talk-be-cc0215f22480.herokuapp.com"; // Sesuaikan dengan URL backend

const router = createBrowserRouter([
  // Route yang tidak membutuhkan autentikasi
  {
    path: "/login",
    element: <SimpleLoginForm url={url} />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        Toastify({
          text: "You're already logged in",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        return redirect("/"); // Redirect ke halaman utama jika sudah login
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <SimpleRegistrationForm url={url} />,
  },

  // Route yang membutuhkan autentikasi
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        Toastify({
          text: "Please login first",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        return redirect("/login"); // Redirect ke login jika tidak ada token
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage url={url} />,
      },
      {
        path: "/add",
        element: <AddReview url={url} />,
      },
      {
        path: "/edit/:id",
        element: <EditReview url={url} />,
      },
      {
        path: "/myreview",
        element: <MyReviewPage url={url} />,
      },
      {
        path: "/hotels",
        element: <RecomendationHotel url={url} />,
      },
      {
        path: "/hotel/list",
        element: <HotelList url={url} />,
      },
    ],
  },
]);

export default router;
