const pool = require('../db');

// GET /resenas
async function listarResenas(req, res) {
  try {
    const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');

    const reseñas = result.rows.map(r => ({
      id: r.id,
      titulo: r.title,
      autor: r.author,
      email: r.email,
      resena: r.comment,
      puntuacion: r.score,
      fecha: r.created_at
    }));

    res.json(reseñas);
  } catch (err) {
    console.error('Error al obtener las reseñas:', err);
    res.status(500).json({ error: "Error al obtener las reseñas" });
  }
}

// GET /resenas/:id
async function obtenerResenaPorId(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM reviews WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    const r = result.rows[0];

    res.json({
      id: r.id,
      titulo: r.title,
      autor: r.author,
      email: r.email,
      resena: r.comment,
      puntuacion: r.score,
      fecha: r.created_at
    });
  } catch (err) {
    console.error('Error al buscar la reseña por ID:', err);
    res.status(500).json({ error: "Error al buscar la reseña" });
  }
}

// POST /resenas
async function crearResena(req, res) {
  const { titulo, autor, email, resena, puntuacion } = req.body;

  if (!titulo || !autor || !email || !resena || !puntuacion) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios: titulo, autor, email, resena y puntuacion."
    });
  }

  if (typeof puntuacion !== 'number' || puntuacion < 1 || puntuacion > 5) {
    return res.status(400).json({
      error: "La puntuación debe ser un número entre 1 y 5."
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO reviews (title, score, comment, author, email)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [titulo, puntuacion, resena, autor, email]
    );

    const nueva = result.rows[0];

    res.status(201).json({
      mensaje: "Reseña recibida correctamente",
      data: {
        id: nueva.id,
        titulo: nueva.title,
        autor: nueva.author,
        email: nueva.email,
        resena: nueva.comment,
        puntuacion: nueva.score,
        fecha: nueva.created_at
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar la reseña en la base de datos" });
  }
}

// PUT /resenas/:id
async function editarResena(req, res) {
  const id = parseInt(req.params.id);
  const { titulo, autor, email, resena, puntuacion } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  if (!titulo || !autor || !email || !resena || !puntuacion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios para editar." });
  }

  if (typeof puntuacion !== 'number' || puntuacion < 1 || puntuacion > 5) {
    return res.status(400).json({ error: "La puntuación debe ser un número entre 1 y 5." });
  }

  try {
    const result = await pool.query(
      `UPDATE reviews
       SET title = $1, score = $2, comment = $3, author = $4, email = $5
       WHERE id = $6
       RETURNING *`,
      [titulo, puntuacion, resena, autor, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    const nueva = result.rows[0];

    res.status(200).json({
      mensaje: "Reseña modificada correctamente",
      data: {
        id: nueva.id,
        titulo: nueva.title,
        autor: nueva.author,
        email: nueva.email,
        resena: nueva.comment,
        puntuacion: nueva.score,
        fecha: nueva.created_at
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al editar la reseña en la base de datos" });
  }
}

// DELETE /resenas/:id
async function eliminarResena(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const result = await pool.query(
      'DELETE FROM reviews WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    res.json({ mensaje: "Reseña eliminada correctamente", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar la reseña" });
  }
}


module.exports = {
  listarResenas,
  obtenerResenaPorId,
  crearResena,
  editarResena,
  eliminarResena
};