import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ActividadesTable({ mode , userActivities = []}) {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  // Fetch de datos desde la API
  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch("");
        const data = await response.json();

        const filteredActivities = userActivities.length
          ? data.filter((activity) => userActivities.includes(activity.id))
          : data;

        setActivities(filteredActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    }

    fetchActivities();
  }, [userActivities]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Actividades</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Horario</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{activity.name}</td>
              <td className="border border-gray-300 px-4 py-2">{activity.schedule}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {mode === "inicio" && (
                  <span className="text-gray-500">Ver más detalles en la página de actividades.</span>
                )}
                {mode === "inscripcion" && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => alert(`Inscribiéndote en ${activity.name}`)}
                  >
                    Inscribirse
                  </button>
                )}
                {mode === "edicion" && (
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={() => navigate(`/edit-activity/${activity.id}`)}
                  >
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
