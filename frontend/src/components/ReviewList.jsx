import { useEffect, useState } from 'react';
import api from '../services/api';

function ReviewList({ onEditar }) {
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/resenas')
      .then(res => {
        setResenas(res.data);
        setCargando(false);
      })
      .catch(() => {
        setError('Error al obtener las reseñas.');
        setCargando(false);
      });
  }, []);

  const eliminarResena = async (id) => {
    if (!confirm("¿Estás seguro de que querés eliminar esta reseña?")) return;

    try {
      await api.delete(`/resenas/${id}`);
      setResenas(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error("Error al eliminar la reseña", err);
      alert("No se pudo eliminar la reseña.");
    }
  };

  if (cargando) return <p className="text-white">Cargando reseñas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
if (resenas.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-400">
      <p className="text-xl font-semibold">Todavía no hay reseñas...</p>
      <p className="mt-2 text-md">¿Qué esperás? ¡Podés ser el primero!</p>
    </div>
  );
}
  return (
    <div className="grid gap-4">
      {resenas.map(r => (
        <div key={r.id} className="relative bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-yellow-400">{r.titulo}</h2>
            <span className="text-yellow-300">{r.puntuacion} ⭐</span>
          </div>
          <p className="text-sm text-gray-300 mb-2">por {r.autor} – {r.email}</p>
          <p className="text-white">{r.resena}</p>
          <p className="text-xs text-gray-500 mt-2">{new Date(r.fecha).toLocaleString()}</p>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() => onEditar(r)}
              className="bg-gray-600 text-white text-sm px-3 py-1 rounded hover:bg-gray-500 transition"
            >
              ✏️ Editar
            </button>
            <button
              onClick={() => eliminarResena(r.id)}
              className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-500 transition"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
