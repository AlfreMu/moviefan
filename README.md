# 🎬 MovieFan API

Una Web API creada con Node.js, Express y PostgreSQL para gestionar reseñas de películas. Permite crear, listar, editar y eliminar reseñas favoritas.

---

## ⚙️ Stack Tecnológico

- Node.js + Express
- PostgreSQL
- Docker (para la base de datos)
- pgAdmin (para ver los datos)
- curl (para probar endpoints)
- Estructura organizada con controllers y routes

---

## 🚀 Cómo levantar el proyecto

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

3. Levantar la base de datos:

cd postgresql
docker compose up -d

4. Iniciar servidor.

```bash
npm start
```

📚 Endpoints disponibles

(Todas las rutas comienzan con /resenas)

✅ GET /resenas
Listar todas las reseñas

✅ GET /resenas/:id
Obtener una reseña específica por ID

✅ POST /resenas
Crear una nueva reseña
Campos requeridos:

titulo (string)
autor (string)
email (string)
resena (string)
puntuacion (number del 1 al 5)

✅ PUT /resenas/:id
Editar una reseña existente

✅ DELETE /resenas/:id
Eliminar una reseña por su ID

🧪 Ejemplos con curl

Crear una reseña.

curl -X POST http://localhost:3000/resenas \
  -H "Content-Type: application/json" \
  -d "{\"titulo\":\"Matrix\", \"autor\":\"Alfre\", \"email\":\"alfre@example.com\", \"resena\":\"Peliculón\", \"puntuacion\":5}"

Editar una reseña.

  curl -X PUT http://localhost:3000/resenas/1 \
  -H "Content-Type: application/json" \
  -d "{\"titulo\":\"Matrix Reloaded\", \"autor\":\"Neo\", \"email\":\"neo@matrix.com\", \"resena\":\"Mejor que la primera\", \"puntuacion\":4}"

Eliminar una reseña.
curl -X DELETE http://localhost:3000/resenas/1

Obtener todas las reseñas.
curl http://localhost:3000/resenas


Obtener una reseña por ID.
curl http://localhost:3000/resenas/1 (id de reseña)


📌 Posibles mejoras a futuro
Validaciones más avanzadas (email válido, longitudes mínimas)
Paginación en el listado
Frontend en React
Dockerizar todo (backend + frontend + db)
Autenticación de usuarios

