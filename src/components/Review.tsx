import React from "react";

const Review = ({ id_resenia, id_usuario, descripcion_resenia, fecha_resenia }) => {
  return (
    <div className="flex flex-col bg-slate-200 shadow-md rounded-lg p-4 mx-6 mb-4">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">{id_usuario}</h2>
        <p className="text-sm text-gray-500">{fecha_resenia}</p>
      </div>
      <h3 className="mt-2 text-md font-medium text-gray-700">Reseña</h3>
      <p className="mt-1 text-gray-600">{descripcion_resenia}</p>
    </div>
  );
};

export default Review;
