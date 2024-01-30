import { useState, useEffect } from 'react';
import Nav from '../components/nav';
import Modal from 'react-modal';
import { FaTable, FaTimes } from 'react-icons/fa';
import { useSpring, animated, useTransition, useTrail } from 'react-spring';
import { BsDatabaseCheck } from "react-icons/bs";
Modal.setAppElement('#__next');

export default function Table() {
  const colors = {
    sidebar: "bg-gradient-to-r from-purple-500 to-pink-500", // Cambiado a una gama de púrpura a rosa para mayor vibrancia
    container: "bg-gray-800", // Mantenido un tono oscuro para un tema oscuro
    text: "text-gray-300", // Texto en blanco para mayor visibilidad en un tema oscuro
    cardBackground: "bg-indigo-600", // Cambiado a un tono más vibrante de índigo
    cardText: "text-white", // Color del texto en las tarjetas
    modalBackground: "bg-gray-900", // Color de fondo del modal
    modalText: "text-gray-800", // Color del texto en el modal
  };
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedTableData, setSelectedTableData] = useState(null); // Nuevo estado para los datos de la tabla
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = async (table) => {
    try {
      const response = await fetch('/api/Tableinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName: table.Tables_in_railway }),
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedTableData(data.tableData);
        setSelectedTable(table);
        setIsModalOpen(true);
      } else {
        console.error('Error fetching table data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const closeModal = () => {
    setSelectedTable(null);
    setSelectedTableData(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/Tableinfo');
        const data = await response.json();
        setTables(data.tables);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchData();
  }, []);

  const trail = useTrail(tables.length, {
    from: { opacity: 0, transform: 'translate3d(0, 50px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: { tension: 100, friction: 15 },
  });

  return (
    <>
      <Nav />
      <div className={`p-4 sm:ml-60 ${colors.text}`} onClick={closeSidebar}>
        <div className={`p-4 border-2 ${colors.container} border-dashed rounded-lg dark:border-${colors.text}`}>
          <h1 className="text-white font-bold text-center text-5xl mb-4">
            Tables <BsDatabaseCheck size={46} style={{ color: 'yellow', display: 'inline-block', marginLeft: '4px', textShadow: '0 0 10px yellow' }} />
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trail.map((style, index) => (
              <div
                key={tables[index].Tables_in_railway}
                onClick={() => openModal(tables[index])}
              >
                <animated.div
                  style={{ ...style }}
                  className={`bg-indigo-700 p-4 rounded-md shadow-md cursor-pointer hover:shadow-xl transition duration-300 ${colors.cardBackground} ${colors.cardText}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaTable size={24} style={{ verticalAlign: 'middle' }} />
                  </div>
                  <h2 className="text-lg font-bold text-center mt-2">{tables[index].Tables_in_railway}</h2>
                  <p className="text-gray-300">{/* Descripción de la tabla, si es necesario */}</p>
                </animated.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Tabla Modal"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: colors.modalBackground,
      padding: '30px',
      outline: 'none',
      border: 'none',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '600px',
      maxHeight: '80%',
      overflowY: 'auto',
    },
  }}
>
  <button
    className={`absolute top-4 right-4 p-2 bg-gray-900 border-none cursor-pointer`}
    onClick={closeModal}
  >
    <FaTimes size={24} color="#fff" />
  </button>
  <h2 className="text-gray-800 font-bold text-3xl">{selectedTable && selectedTable.Tables_in_railway}</h2>
  <p className="text-gray-300">{/* Contenido adicional del modal, si es necesario */}</p>
  
  {/* Mostrar los datos de la tabla en una tabla HTML */}
  {selectedTableData && (
    <table className="w-full mt-4">
      <thead>
        <tr>
          {Object.keys(selectedTableData[0]).map((key) => (
            <th key={key} className="py-2 px-4 bg-gray-800 text-white">{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {selectedTableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((value, columnIndex) => (
              <td key={columnIndex} className="py-2 px-4 border text-gray-900">{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )}
</Modal>

    </>
  );
}
