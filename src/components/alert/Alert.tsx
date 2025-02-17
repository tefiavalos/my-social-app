import React from 'react';

interface Props {
    message: string;
    type: "base" | "error" | "success" | "warning" | "info";
}

const Alert: React.FC<Props> = ({ message, type }) => {
  const alertClasses = {
    base: "p-4 rounded-xl shadow-md mb-4 text-center", 
    error: "bg-red-100 text-red-700 border border-red-400", 
    success: "bg-green-100 text-green-700 border border-green-400", 
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-400", 
    info: "bg-blue-100 text-blue-700 border border-blue-400", 
  };

  return (
    <div className={alertClasses.base + " " + alertClasses[type]}>
      {message}
    </div>
  );
};

export default Alert;