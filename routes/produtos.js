const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/produtos.json');

// Função para ler os dados
function lerProdutos() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// Função para salvar
function salvarProdutos(produtos) {
  fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2));
}

// GET - listar produtos
router.get('/', (req, res) => {
  const produtos = lerProdutos();
  res.json(produtos);
});

// POST - adicionar produto
router.post('/', (req, res) => {
  const produtos = lerProdutos();
  const novoProduto = {
    id: Date.now(),
    nome: req.body.nome,
    quantidade: req.body.quantidade,
    preco: req.body.preco
  };

  produtos.push(novoProduto);
  salvarProdutos(produtos);

  res.status(201).json(novoProduto);
});

// PUT - atualizar produto
router.put('/:id', (req, res) => {
  let produtos = lerProdutos();
  const id = parseInt(req.params.id);

  produtos = produtos.map(produto => {
    if (produto.id === id) {
      return { ...produto, ...req.body };
    }
    return produto;
  });

  salvarProdutos(produtos);
  res.json({ mensagem: 'Produto atualizado' });
});

// DELETE - remover produto
router.delete('/:id', (req, res) => {
  let produtos = lerProdutos();
  const id = parseInt(req.params.id);

  produtos = produtos.filter(produto => produto.id !== id);
  salvarProdutos(produtos);

  res.json({ mensagem: 'Produto removido' });
});

module.exports = router;
