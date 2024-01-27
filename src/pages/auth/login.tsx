import { SyntheticEvent, useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import SuccessCard from '@/components/SuccessCard';
import ErrorCard from '@/components/ErrorCard';
import Confetti from 'react-confetti';
import Link from 'next/link';
export default function Register() {
  const [responseMessage, setResponseMessage] = useState("");
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const [errorCardMessage, setErrorCardMessage] = useState("");
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    password: "",
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/LoginData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: formData.nombreUsuario,
          contraseña: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.name);
        console.log("Respuesta del servidor:", data);

        setShowSuccessCard(true);
        setShowConfetti(true);
        setTimeout(() => {
          setShowSuccessCard(false);
        setShowConfetti(false);

        }, 5000); // Por ejemplo, ocultar después de 5 segundos

        setFormData({
          nombreUsuario: "",
          password: "",
        });
      } else {
        const errorData = await response.json();

        if (  errorData.message=="Credenciales incorrectas") {
        
          setShowErrorCard(true);
          setErrorCardMessage("Credenciales incorrectas");
          setTimeout(() => {
            setShowErrorCard(false);
            setErrorCardMessage("");
          }, 5000);
        } else {
          console.error("Error en el inicio de sesión:", errorData);
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div id="about" className="h-screen md:flex" style={{ background: 'linear-gradient(to bottom, #000000, #020411)', color: 'white' }}>
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-gray-800 to-pink-700 i justify-around items-center hidden"
        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2023/08/28/02/58/village-8218204_1280.png')" }}>
        <div className="bg-black p-10 bg-opacity-70 ">
          <h1 className="text-white font-bold text-4xl font-sans">Bienvenido freeshop</h1>
          <p className="text-white mt-1">The most popular peer-to-peer lending at SEA</p>
          <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center ">
        <form onSubmit={onSubmit} className="bg-black p-8 rounded-lg">
          <h1 className="text-gray-300 font-bold text-2xl mb-1">Inicia sesion de manera rapida</h1>
          <p className="text-sm font-normal text-gray-200 mb-7">Bienvenido puedes Iniciar sesion con tu usuario y contraseña asignados</p>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white bg-opacity-20">
            <FaUser className="h-5 w-5 text-gray-400" />
            <input
              className="bg-transparent text-white pl-2 outline-none border-none hover:text-pink-400 font-bold transition-all duration-300 hover:scale-90 ease-out transform hover:translate-x-2"
              type="text" name="nombreUsuario" placeholder="Nombre de Usuario"
              value={formData.nombreUsuario}
              onChange={handleInputChange}
              required={true}
            />
          </div>

         

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white bg-opacity-20">
            <FaLock className="h-5 w-5 text-gray-400" />
            <input
              className="bg-transparent text-white pl-2 outline-none border-none hover:text-pink-400 font-bold transition-all duration-300 hover:scale-90 ease-out transform hover:translate-x-2"
              type="password" name="password" placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required={true}
            />
          </div>

          <button
            type="submit"
            className="block w-full bg-pink-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Loging
          </button>
          <span className="text-sm ml-2 text-white hover:text-blue-500 cursor-pointer">
            <Link  href={'/auth/register'}>Click for Loging </Link>
          </span>
        </form>
        {showConfetti && <Confetti />}
      </div>
      {responseMessage && <p>Respuesta del servidor: {responseMessage}</p>}

      {/* Tarjeta de registro exitoso */}
      <SuccessCard show={showSuccessCard} description='Inicio de sesion exitoso' />
      {/* Tarjeta de error */}
      {showErrorCard && <ErrorCard show={showErrorCard} message={errorCardMessage} />}
    </div>
  );
}