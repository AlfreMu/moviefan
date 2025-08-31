import { useState } from 'react';
import Header from './components/Header';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [recargarResenas, setRecargarResenas] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(null); // ← contiene la reseña a editar o null

  const manejarAgregar = () => {
    setModoEdicion(null);               // Asegura que sea modo creación
    setMostrarFormulario(true);
  };

  const manejarCancelar = () => {
    setModoEdicion(null);
    setMostrarFormulario(false);
  };

  const manejarExito = () => {
    setModoEdicion(null);
    setMostrarFormulario(false);
    setRecargarResenas(prev => !prev); // fuerza recarga de lista
  };

  const manejarEditar = (resena) => {
    setModoEdicion(resena);            // Modo edición con datos cargados
    setMostrarFormulario(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <Header onAgregar={manejarAgregar} />
      <hr className="border-t border-yellow-500 my-4 opacity-30" /> 
      {mostrarFormulario ? (
        <ReviewForm
          onCancelar={manejarCancelar}
          onExito={manejarExito}
          resenaEditar={modoEdicion}
        />
      ) : (
        <ReviewList
          key={recargarResenas}
          onEditar={manejarEditar}
        />
      )}
    </div>
  );
}

export default App;
