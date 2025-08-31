function Header({ onAgregar }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-yellow-400">🎬 MovieFan</h1>
      <button
        onClick={onAgregar}
        className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300 transition"
      >
        + Agregar Reseña
      </button>
    </div>
  );
}

export default Header;
