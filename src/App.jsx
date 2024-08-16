import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ShopList from "./components/ShopList";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import ShopDetail from "./components/ShopDetail";
import AdminPage from "./pages/admin-page";
import ProfilePage from "./pages/profile-page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/category/:category" element={<ShopList />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
