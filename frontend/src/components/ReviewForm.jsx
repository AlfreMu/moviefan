import { useState, useEffect } from 'react';
import api from '../services/api';

function ReviewForm({ onCancelar, onExito, resenaEditar }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [email, setEmail] = useState('');
  const [resena, setResena] = useState('');
  const [puntuacion, setPuntuacion] = useState(0);
  const [error, setError] = useState(null);

  // Si estamos en modo edición, precargar los datos
  useEffect(() => {
    if (resenaEditar) {
      setTitulo(resenaEditar.titulo);
      setAutor(resenaEditar.autor);
      setEmail(resenaEditar.email);
      setResena(resenaEditar.resena);
      setPuntuacion(resenaEditar.puntuacion);
    } else {
      // modo creación: limpiar todo
      setTitulo('');
      setAutor('');
      setEmail('');
      setResena('');
      setPuntuacion(0);
    }
  }, [resenaEditar]);

  const enviar = async (e) => {
    e.preventDefault();
    setError(null);

    const datos = {
      titulo,
      autor,
      email,
      resena,
      puntuacion: Number(puntuacion)
    };

    try {
      if (resenaEditar) {
        // MODO EDICIÓN
        await api.put(`/resenas/${resenaEditar.id}`, datos);
      } else {
        // MODO CREACIÓN
        await api.post('/resenas', datos);
      }
      onExito();
    } catch (err) {
      console.error(err);
      setError('No se pudo enviar la reseña. Revisá los datos.');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        {resenaEditar ? 'Editar reseña' : 'Agregar nueva reseña'}
      </h2>

      {error && <p className="bg-red-500 text-white p-2 rounded mb-4">{error}</p>}

      <form onSubmit={enviar} className="grid gap-4">
        <div>
          <label className="block mb-1">Título de la película *</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Tu nombre *</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email *</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Puntuación (1 a 5) *</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
            value={puntuacion}
            onChange={(e) => setPuntuacion(e.target.value)}
            min={1}
            max={5}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Comentario *</label>
          <textarea
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
            rows={4}
            value={resena}
            onChange={(e) => setResena(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancelar}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300"
          >
            {resenaEditar ? 'Guardar cambios' : 'Agregar reseña'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
