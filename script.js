let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let carrinho = [];

function salvarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function cadastrarProduto() {
  const nome = document.getElementById("nomeProduto").value;
  const precoKg = parseFloat(document.getElementById("precoKg").value);

  if (!nome || !precoKg) return alert("Preencha tudo");

  produtos.push({ nome, precoKg });
  salvarProdutos();
  atualizarSelect();
}

function atualizarSelect() {
  const select = document.getElementById("produtoSelect");
  select.innerHTML = "";

  produtos.forEach((p, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${p.nome} - R$ ${p.precoKg}/Kg`;
    select.appendChild(option);
  });
}

function adicionarCarrinho() {
  const index = document.getElementById("produtoSelect").value;
  const peso = parseFloat(document.getElementById("peso").value);

  if (peso <= 0) return alert("Peso inválido");

  const produto = produtos[index];
  const total = produto.precoKg * peso;

  carrinho.push({ ...produto, peso, total });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("carrinho");
  const totalSpan = document.getElementById("total");

  lista.innerHTML = "";
  let soma = 0;

  carrinho.forEach(item => {
    soma += item.total;
    const li = document.createElement("li");
    li.textContent = `${item.nome} - ${item.peso}Kg = R$ ${item.total.toFixed(2)}`;
    lista.appendChild(li);
  });

  totalSpan.textContent = soma.toFixed(2);
}

atualizarSelect();
