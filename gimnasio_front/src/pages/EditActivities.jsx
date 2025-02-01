import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function ActivityEdit() {
  // Control de sesión
  const auth = useAuth("state");
  if (!auth) {
    return <div>Error: No iniciaste sesión</div>;
  }

  const [activity, setActivity] = useState(null);
  const { token, userID } = auth;
  const { id } = useParams();
  const navigate = useNavigate();

  // Datos para actualizar la actividad
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0); // Ejemplo: duración en minutos
  const [image, setImage] = useState("");

  // Precargar datos
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`/activities/${id}/`);
        if (!response.ok) {
          throw new Error("No se pudo cargar los datos");
        }
        const activity = await response.json();

        if (activity.owner !== Number(userID)) {
          alert("No tienes permiso para editar esta actividad");
          return navigate(-1);
        }

        setActivity(activity);
        setName(activity.name);
        setDescription(activity.description);
        setDuration(activity.duration);
        setImage(activity.image);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchActivity();
  }, [id, navigate, userID]);

  if (!activity) {
    return <p>Cargando...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const activityData = {
        name,
        description,
        duration,
        cupo,
      };

      const response = await fetch(`/activities/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) throw new Error("Error al editar la actividad");

      const result = await response.json();
      console.log("Actividad editada:", result);
      navigate(`/activities/${id}`); // Redirige a la página de la actividad
    } catch (error) {
      console.error("Error al editar la actividad:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta actividad?")) return;

    try {
      const response = await fetch(`/activities/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al eliminar la actividad");

      console.log("Actividad eliminada");
      navigate("/activities");
    } catch (error) {
      console.error("Error al eliminar la actividad:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="box" style={styles.form}>
        <h1 className="title">Editar Actividad</h1>
        <div className="field">
          <label className="label">Nombre</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Nombre de la actividad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={255}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Descripción</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Descripción de la actividad"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Duración (minutos)</label>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="Duración de la actividad"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              min={0}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Cupo maximo</label>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="Duración de la actividad"
              value={cupo}
              onChange={(e) => setDuration(e.target.value)}
              required
              min={0}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-primary">
              Editar Actividad
            </button>
            <button type="button" className="button is-danger" onClick={handleDelete}>
              Eliminar Actividad
            </button>
            <button className="button" onClick={() => navigate(-1)}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const styles = {
  form: {
    maxWidth: "600px",
    margin: "0 auto",
  },
};

export default ActivityEdit;
