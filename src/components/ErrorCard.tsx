// components/ErrorCard.js
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import 'animate.css';

interface ErrorCardProps {
  show: boolean;
  message: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ show, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 p-4 bg-red-500 text-white z-50 rounded-lg shadow-md transform -translate-x-full animate__animated animate__slideInLeft">
      <div className="flex items-center">
        <FaExclamationTriangle className="mr-2" />
        {message}
      </div>
    </div>
  );
};

export default ErrorCard;
