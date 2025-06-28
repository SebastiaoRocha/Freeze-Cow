const express = require('express');

const {rotasColaborador} = require('./src/routes/colaboradorRoutes');

const {rotasUnidade} = require('./src/routes/unidadeRoutes');

const app = express();

const PORT = 8081;

app.use(express.json());

app.use("/colaboradores", rotasColaborador);
app.use("/unidades", rotasUnidade);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});