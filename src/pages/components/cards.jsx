import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUser, FaChartLine, FaMoneyBillAlt, FaTasks } from "react-icons/fa";
Modal.setAppElement("#elementocard");

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height="80%">
    <LineChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#87c7ff" fill="#87c7ff" />
    </LineChart>
  </ResponsiveContainer>
);

const Card = ({ title, description, icon, color, type, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div  id="elementocard"
        className={`rounded-lg overflow-hidden shadow-md p-4 ${color}`}
        onClick={openModal}
        style={{ cursor: "pointer" }}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl text-white font-bold">{title}</h2>
          {icon}
        </div>
        <p className="text-gray-200 mb-4">{description}</p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Chart Modal"
      >
        <button onClick={closeModal}>Cerrar</button>
        {modalIsOpen && <Chart data={data} />}
      </Modal>
    </>
  );
};

const AccountCard = () => {
  
  const [responseUserName, setResponseUserName] = useState([]);

  useEffect(() => {
    async function fetchUserName() {
      try {
        const response = await axios.get("../api/usuarios");
        if (response.data && response.data.length > 0) {
          setResponseUserName(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserName();
  }, []);

  // Calculate user count by month
  const userCountByMonth = {};
  responseUserName.forEach(user => {
    const date = new Date(user.fecha_registro);
    const month = date.toLocaleString('default', { month: 'short' }); // Get month name
    userCountByMonth[month] = (userCountByMonth[month] || 0) + 1;
  });

  // Prepare data for the chart
  const chartData = Object.keys(userCountByMonth).map(month => ({
    name: month,
    value: userCountByMonth[month],
  }));

  const cardsData = [
    {
      title: `${responseUserName.length}k`,
      description: "Usuarios Registrados",
      icon: <FaUser size={32} color="#fff" />,
      color: "bg-blue-800",
      type: "line",
      showCard: true,
      data: chartData,
    },
    {
      title: "Ingresos",
      description: "Descripción de la tarjeta 2.",
      icon: <FaChartLine size={32} color="#fff" />,
      color: "bg-blue-300",
      type: "area",
      showCard: true,
    },
    {
      title: "Gastos",
      description: "Descripción de la tarjeta 3.",
      icon: <FaMoneyBillAlt size={32} color="#fff" />,
      color: "bg-yellow-500",
      type: "bar",
      showCard: false, // Set to true if you want to show this card
    },
    {
      title: "Tareas Pendientes",
      description: "Descripción de la tarjeta 4.",
      icon: <FaTasks size={32} color="#fff" />,
      color: "bg-red-500",
      type: "line",
      showCard: true,
    },
    {
      title: "Nueva Tarjeta",
      description: "Descripción de la tarjeta 5.",
      icon: <FaUser size={32} color="#fff" />,
      color: "bg-green-500",
      type: "line",
      showCard: true,
    },
    
    // ... Add more cards as needed
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {cardsData.map((card, index) => (
        card.showCard && <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default AccountCard;
