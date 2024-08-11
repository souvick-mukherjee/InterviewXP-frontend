"use client";

import React, { useState } from "react";
import Login from "@/components/Login";
import Register from "@/components/Register";

function Authenticate() {
  const [auth, setAuth] = useState("Login");

  // Function to toggle between Login and Register
  const toggleAuth = () => {
    setAuth((prevAuth) => (prevAuth === "Login" ? "Register" : "Login"));
  };

  return (
    <div className="max-w-7xl mx-auto mt-24">
      {auth === "Login" ? (
        <Login toggleAuth={toggleAuth} />
      ) : (
        <Register toggleAuth={toggleAuth} />
      )}
    </div>
  );
}

export default Authenticate;
