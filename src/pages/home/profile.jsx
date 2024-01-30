import React, { useState, useEffect } from "react";
import { FaDatabase, FaUser, FaLock, FaServer } from "react-icons/fa";
import Nav from "../components/nav";
import Image from "next/image";

const DatabaseConnectionForm = () => {
  const [fadeIn, setFadeIn] = useState([false, false, false, false, false, false, false]);
  const [username, setUsername] = useState("");
  const [CurrentPassword, setCurrentPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle logic to send data to the database or perform any action here.
  };

  useEffect(() => {
    fadeInAnimation();
  }, []);

  const fadeInAnimation = () => {
    fadeIn.forEach((_, index) => {
      setTimeout(() => {
        setFadeIn((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 500);
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen pt-1">
        <div className="container mx-auto p-4">
          <Nav />

          <div className="max-w-md mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Columna extra */}
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4 hidden">Photo profile</h2>
            </div>
            <div className="w-full">
              <div className="w-full flex justify-center items-center" style={{ opacity: fadeIn[0] ? 1 : 0, transition: "opacity 1s" }}>
                <div className="w-32 h-32 flex justify-center items-center">
                  <div className="relative rounded-full bg-gray-900 w-full h-full overflow-hidden">
                    <Image
                      alt="robot profile"
                      src={"https://robohash.org/sqlforce"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Columna del título "Personal Information" */}
            <div className="w-full mb-8" style={{ opacity: fadeIn[1] ? 1 : 0, transition: "opacity 1s" }}>
              <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
              <p>Here you can change your personal information. Please do not share your personal information.</p>
            </div>

            {/* Columna del formulario */}
            <div className="w-full" style={{ opacity: fadeIn[2] ? 1 : 0, transition: "opacity 1s" }}>
              <form className="m-2" onSubmit={handleFormSubmit}>
                <div className="flex flex-col mb-4">
                  <label htmlFor="username" className="mb-2">Username</label>
                  <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border border-gray-400 rounded-md p-2" />
                </div>
                {/* Agrega más inputs aquí si es necesario */}
                <button type="submit" className="bg-black w-full opacity-85 p-3 rounded-lg text-white">Save</button>
              </form>
            </div>
            
            {/* Columna de cambio de contraseña */}
            <div className="w-full mb-8" style={{ opacity: fadeIn[3] ? 1 : 0, transition: "opacity 1s" }}>
              <h2 className="text-2xl font-bold mb-4 text-blue-700 opacity-85 ">Change password</h2>
              <p>Update your password associated with your account.</p>
            </div>
            <div className="w-full" style={{ opacity: fadeIn[4] ? 1 : 0, transition: "opacity 1s" }}>
              <form className="m-2" onSubmit={handleFormSubmit}>
                <div className="flex flex-col mb-4">
                  <label htmlFor="CurrentPassword" className="mb-2">Current password</label>
                  <input type="text" name="CurrentPassword" id="username" value={CurrentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="current password" className="border border-gray-400 rounded-md p-2" />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="New password" className="mb-2">New password</label>
                  <input type="New password" name="New password" id="New password" placeholder="New password" className="border border-gray-400 rounded-md p-2" />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="Confirm password" className="mb-2">Confirm password</label>
                  <input type="Confirm password" name="Confirm password" id="Confirm password" placeholder="Confirm password" className="border border-gray-400 rounded-md p-2" />
                </div>
                {/* Agrega más inputs aquí si es necesario */}
                <button type="submit" className="bg-blue-700 w-full opacity-85 p-3 rounded-lg text-white">Save</button>
              </form>
            </div>

            {/* Columna de la imagen */}
            <div className="w-full mb-8" style={{ opacity: fadeIn[5] ? 1 : 0, transition: "opacity 1s" }}>
              <h2 className="text-2xl font-bold mb-4 text-red-500 opacity-85">delete Acount</h2>
              <p>Update your password associated with your account.</p>
            </div>
            <div className="w-full" style={{ opacity: fadeIn[6] ? 1 : 0, transition: "opacity 1s" }}>
              <form className="m-2" onSubmit={handleFormSubmit}>
                <div className="flex flex-col mb-4">
                  <label htmlFor="CurrentPassword" className="mb-2">enter your email</label>
                  <input type="text" name="CurrentPassword" id="username" value={CurrentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="@example.com" className="border border-gray-400 rounded-md p-2" />
                </div>
                {/* Agrega más inputs aquí si es necesario */}
                <button type="submit" className="bg-red-600 w-full opacity-85 p-3 rounded-lg text-white">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatabaseConnectionForm;
