import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const { token, user, isAuthenticated } = useAuth("state");
  const { logout } = useAuth("actions");

  const userRole = user?.role || null; // Determinar el rol del usuario

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto flex justify-between items-center py-4">
        {/* Logo y Nombre */}
        <div className="flex items-center space-x-4">
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-lg font-bold hover:text-yellow-300"
          >
            <img
              src="../public/Logo Gimnasio Gym Entrenamiento Moderno Rosa Salmón Negro.png"
              alt="Average Joe"
              className="h-10 logo"
            />
            <span>Average Joe</span>
          </NavLink>
        </div>

        {/* Enlaces de Navegación */}
        <div className="flex items-center space-x-6">




          {isAuthenticated && (
            <>
                        <NavLink
            to="/Actividades"
            className={({ isActive }) =>
              `hover:text-yellow-300 ${isActive ? "text-yellow-300" : ""}`
            }
          >
            Actividades
          </NavLink>
              {/* Enlace de Perfil */}
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `hover:text-yellow-300 ${isActive ? "text-yellow-300" : ""}`
                }
              >
                Mi Perfil
              </NavLink>

              {/* Enlace de Pagar Cuota */}
              <NavLink
                to="/PagoCuota"
                className={({ isActive }) =>
                  `hover:text-yellow-300 ${isActive ? "text-yellow-300" : ""}`
                }
              >
                Pagar Cuota
              </NavLink>

              {/* Opciones según el rol */}
              {userRole === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `hover:text-yellow-300 ${isActive ? "text-yellow-300" : ""}`
                  }
                >
                  Administración
                </NavLink>
              )}
              {userRole === "employee" && (
                <NavLink
                  to="/employee"
                  className={({ isActive }) =>
                    `hover:text-yellow-300 ${isActive ? "text-yellow-300" : ""}`
                  }
                >
                  Asistencia
                </NavLink>
              )}

              {/* Botón de Logout */}
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}

          {/* Si no está autenticado */}
          {!isAuthenticated && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `bg-green-500 px-4 py-2 rounded hover:bg-green-700 ${
                  isActive ? "text-yellow-300" : ""
                }`
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
