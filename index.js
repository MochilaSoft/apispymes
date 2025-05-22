const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/paises', require('./routes/paisRoutes'));
app.use('/api/estados', require('./routes/estadoRoutes'));
app.use('/api/ciudades', require('./routes/ciudadRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/pymes', require('./routes/pymesRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/categorias', require('./routes/suscripcionRoutes'));
app.use('/api/categorias', require('./routes/usuarioSuscripcionRoutes'));

// Servidor
const PORT = process.env.PORT || 3000;
app.get('/inicial', (req, res) => {
  res.send('¡Hola desde el servidor!');
});
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
