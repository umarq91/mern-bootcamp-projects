import React, { useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Navibar from "./components/layout/Navibar";
import Footer from "./components/layout/Footer";
import { login } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import NotFoundPage from "./pages/NotFoundPage";
import CreateEventPage from "./pages/CreateEventPage";
import SingleEventPage from "./pages/SingleEventPage";
import GetRegisterEvent from "./pages/GetRegisterEvent";
import SignUpPage from "./pages/SignUpPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import HeroPage from "./pages/HeroPage";
import GetUserOfEvent from "./pages/GetUserOfEvent";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ContactUs from "./pages/ContactUs";
import UserProfilePage from "./pages/UserProfilePage";
import UpdateUserPage from "./pages/UpdateUserPage";
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_AUTH_URL}/auth`
      );
      if (data) {
        dispatch(login(data?.data));
      }
    };
    getData();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Navibar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/all-events" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/user-profile/:id" element={<UserProfilePage />} />
          <Route path="/user-profile/:id/update" element={<UpdateUserPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/updateEvent/:id" element={<UpdateEventPage />} />
          <Route path="/event/:eventId/registered-users" element={<GetUserOfEvent />} />
          <Route path="/single-event/:id" element={<SingleEventPage />} />
          <Route path="/getRegisteredEvents/:id" element={<GetRegisterEvent />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
