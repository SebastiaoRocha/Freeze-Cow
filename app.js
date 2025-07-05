const express = require('express');

const {rotasColaborador} = require('./src/routes/colaboradorRoutes');

const {rotasUnidade} = require('./src/routes/unidadeRoutes');

const {rotasFornecedor} = require('./src/routes/fornecedorRoutes');

const {rotasCliente} = require('./src/routes/clienteRoutes');

const {rotasPedido} = require('./src/routes/pedidoRoutes');

const {rotasProduto} = require('./src/routes/produtoRoutes');

const app = express();

const PORT = 8081;

app.use(express.json());

app.use("/colaboradores", rotasColaborador);
app.use("/unidades", rotasUnidade);
app.use("/fornecedores", rotasFornecedor);
app.use("/clientes", rotasCliente);
app.use("/pedidos", rotasPedido);
app.use("/produtos", rotasProduto);


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});