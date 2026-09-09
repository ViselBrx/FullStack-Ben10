require('dotenv').config();
const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const aliensRoutes = require('./src/routes/aliens.routes');
const seriesRoutes = require('./src/routes/series.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');

app.use('/series', seriesRoutes);
app.use('/aliens', aliensRoutes);
app.use('/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log (`Confira o insomnia para testar`);
});
