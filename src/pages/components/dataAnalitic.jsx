import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line, CartesianGrid } from 'recharts';
import axios from 'axios';
import { IoAnalytics } from "react-icons/io5";
const ChartCard = ({ title, titleColor, children }) => (
  <div className="p-4 rounded-lg shadow-md mb-4 hover:transition-all duration-300 ease-out transform hover:translate-y-5 hover:bg-gray-700">
    <h3 className={`text-lg font-bold mb-8 ${titleColor}`}>{title}</h3>
    {children}
  </div>
);

const ChartContainer = () => {
  const [user, SetUser] = useState({
    username: ""
  });

  const getProfile = async () => {
    try {
      const xd = await axios.get("../api/profile");
      SetUser(xd.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const pieChartData = [
    { name: 'Hombres', value: 45 },
    { name: 'Mujeres', value: 55 },
  ];

  const barChartData = [
    { name: 'Edad 18-25', valor: 30 },
    { name: 'Edad 26-35', valor: 45 },
    { name: 'Edad 36-50', valor: 20 },
    { name: 'Edad 51+', valor: 5 },
  ];

  const radarChartData = [
    { subject: 'Matemáticas', A: 85, B: 90 },
    { subject: 'Inglés', A: 70, B: 80 },
    { subject: 'Ciencias', A: 65, B: 75 },
    { subject: 'Historia', A: 75, B: 85 },
    { subject: 'Arte', A: 60, B: 70 },
  ];

  const economicGrowthData = [
    { year: 2010, gdp: 100, employment: 80, inflation: 2 },
    { year: 2011, gdp: 120, employment: 85, inflation: 3 },
    { year: 2012, gdp: 150, employment: 90, inflation: 2.5 },
    { year: 2013, gdp: 180, employment: 95, inflation: 2 },
    { year: 2014, gdp: 200, employment: 100, inflation: 1.5 },
    { year: 2015, gdp: 240, employment: 110, inflation: 1 },
    { year: 2016, gdp: 280, employment: 120, inflation: 1.2 },
    { year: 2017, gdp: 320, employment: 130, inflation: 1.8 },
    { year: 2018, gdp: 350, employment: 140, inflation: 2 },
    { year: 2019, gdp: 380, employment: 150, inflation: 1.5 },
    { year: 2020, gdp: 330, employment: 100, inflation: 0.5 },
  ];

  // Definir colores para el gráfico de rosquilla
  const pieChartColors = ['#3498db', '#e74c3c'];

  // Definir colores para el gráfico de líneas
  const lineChartColors = ['#3498db', '#e74c3c', '#2ecc71'];

  return (
    <div onMouseOver={getProfile} className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-500 opacity-70 hover:transition-all duration-300 ease-out transform hover:translate-y-4 flex items-center justify-center">
        <span className="mr-2 text-white opacity-85">
          Dashboard de Información Estadística {user.usuario && user.usuario.usuario}
        </span>
        <IoAnalytics className="text-5xl text-white hover:text-gray-800" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <ChartCard titleColor="text-white opacity-85" title="Distribución de Género">
          <PieChart width={180} height={250} className="mx-auto">
            <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#4FD1C5">
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [value, `(${((value / pieChartData.reduce((acc, d) => acc + d.value, 0)) * 100).toFixed(2)}%) ${name}`]} />
            <Legend formatter={(value) => `${value} -`} />
          </PieChart>
        </ChartCard>

        <ChartCard titleColor="text-white opacity-85" title="Edades de Usuarios">
          <BarChart width={220} height={250} data={barChartData} className="mx-auto">
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" fill="#7E57C2">
              {barChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`#7E57C2`} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>

        <ChartCard titleColor="text-white opacity-85" title="Desempeño Académico">
          <RadarChart outerRadius={100} width={220} height={250} data={radarChartData} className="mx-auto">
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar name="Usuario Actual" dataKey="A" stroke="#FFD54F" fill="#FFD54F" fillOpacity={0.6} />
            <Radar name="Promedio General" dataKey="B" stroke="#66BB6A" fill="#66BB6A" fillOpacity={0.6} />
            <Tooltip />
            <Legend formatter={(value) => `${value} -`} />
          </RadarChart>
        </ChartCard>

        <ChartCard titleColor="text-white opacity-85" title="Crecimiento Económico">
          <LineChart width={260} height={250} data={economicGrowthData} className="mx-auto">
            <h1>text</h1>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="gdp" stroke={lineChartColors[0]} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="employment" stroke={lineChartColors[1]} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="inflation" stroke={lineChartColors[2]} activeDot={{ r: 8 }} />
          </LineChart>
        </ChartCard>
      </div>
    </div>
  );
};

export default ChartContainer;
