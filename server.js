const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

/* TESTE */
app.get("/", (req, res) => {
  res.send("Backend da Fruteira rodando ✅");
});

/* CRIAR PRODUTO */
app.post("/produtos", async (req, res) => {
  const { nome, tipo, preco_kg, preco_unit } = req.body;

  const result = await pool.query(
    `INSERT INTO produtos (nome, tipo, preco_kg, preco_unit)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [nome, tipo, preco_kg, preco_unit]
  );

  res.json(result.rows[0]);
});

/* LISTAR PRODUTOS */
app.get("/produtos", async (req, res) => {
  const result = await pool.query("SELECT * FROM produtos");
  res.json(result.rows);
});

/* REGISTRAR VENDA (PESO VARIÁVEL) */
app.post("/vendas", async (req, res) => {
  const { produto_id, peso } = req.body;

  const produto = await pool.query(
    "SELECT * FROM produtos WHERE id=$1",
    [produto_id]
  );

  const precoKg = produto.rows[0].preco_kg;
  const total = precoKg * peso;

  const venda = await pool.query(
    `INSERT INTO vendas (produto_id, peso, total)
     VALUES ($1,$2,$3) RETURNING *`,
    [produto_id, peso, total]
  );

  res.json(venda.rows[0]);
});

/* START */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log("Servidor rodando na porta", PORT)
);
