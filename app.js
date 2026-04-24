const express = require('express');
const app = express();
const produtosRoutes = require('./routes/produtos');

app.use(express.json());
app.use('/produtos', produtosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
