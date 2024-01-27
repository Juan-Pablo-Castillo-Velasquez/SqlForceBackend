// components/SuccessCard.tsx
import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface SuccessCardProps {
  show: boolean;
  description: string;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ show,description}) => {
  useEffect(() => {
    if (show) {
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 p-4 bg-green-500 text-white z-50 rounded-lg shadow-md animate__animated animate__slideInRight">
      <div className="flex items-center">
        <FaCheckCircle className="mr-2" />
       {description}
      </div>
    </div>
  );
};

export default SuccessCard;
