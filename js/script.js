const vitrine = document.querySelector(".vitrine");
const carrinho = document.querySelector(".carrinho-de-compras");
const lateral = document.querySelector(".container-lateral");

let listaProdutos = [];

function adcionaItem(data) {
  listaProdutos.push(data);
}

function removeItem(data) {
  const lista = [];
  for (let i = 0; i < listaProdutos.length; i++) {
    if (listaProdutos[i].id != data.id) {
      lista.push(listaProdutos[i]);
    }
  }
  listaProdutos = lista;
}

function totalCarrinho() {
  let total = 0;
  for (let i = 0; i < listaProdutos.length; i++) {
    total += listaProdutos[i].value;
  }
  return total;
}

function criarCart(data) {
  const cardCarrinho = document.createElement("div");
  const img = document.createElement("div");
  const foto = document.createElement("img");
  const text = document.createElement("div");
  const nomeProduto = document.createElement("span");
  const valorCarrinho = document.createElement("span");
  const buttonRemover = document.createElement("button");

  foto.src = data.img;
  nomeProduto.innerText = data.nameItem;
  valorCarrinho.innerText = `R$ ${data.value},00`;
  buttonRemover.innerText = "Remover produto ";

  cardCarrinho.classList.add("card-carrinho");
  foto.classList.add("foto-carrinho");
  nomeProduto.classList.add("nome-produto");
  buttonRemover.classList.add("button-remover");
  valorCarrinho.classList.add("valor-carinho");
  img.classList.add("nomes");
  text.classList.add("text");

  cardCarrinho.id = "cart" + data.id;
  buttonRemover.id = "card_" + data.id;

  img.appendChild(foto);
  cardCarrinho.appendChild(img);
  cardCarrinho.appendChild(text);
  text.appendChild(nomeProduto);
  text.appendChild(valorCarrinho);
  text.appendChild(buttonRemover);

  buttonRemover.addEventListener("click", function () {
    cardCarrinho.remove();
    removeItem(data);
    document.querySelector(
      "#contagem-Itens"
    ).innerHTML = `Quantidade:${listaProdutos.length}`;

    document.querySelector(
      "#soma-Itens"
    ).innerText = `Total: R$ ${totalCarrinho()},00 `;

    if (listaProdutos.length === 0) {
      lateral.classList.remove("interior-carrinho");
    }
  });

  carrinho.appendChild(cardCarrinho);
}

function criarCard(data, vitrine) {
  const cardPrincipal = document.createElement("div");
  const foto = document.createElement("img");
  const tag = document.createElement("button");
  const nomeProdutos = document.createElement("span");
  const descricao = document.createElement("p");
  const valor = document.createElement("span");
  const buttonCarrinho = document.createElement("button");

  foto.src = data.img;
  tag.innerText = data.tag;
  nomeProdutos.innerText = data.nameItem;
  descricao.innerText = data.description;
  valor.innerText = `R$ ${data.value},00`;
  buttonCarrinho.innerText = data.addCart;

  buttonCarrinho.id = data.id;

  cardPrincipal.classList.add("cards");
  tag.classList.add("tag");
  nomeProdutos.classList.add("nome-produto");

  valor.classList.add("valor");
  buttonCarrinho.classList.add("button-Carinho");

  cardPrincipal.appendChild(foto);
  cardPrincipal.appendChild(tag);
  cardPrincipal.appendChild(nomeProdutos);
  cardPrincipal.appendChild(descricao);
  cardPrincipal.appendChild(valor);
  cardPrincipal.appendChild(buttonCarrinho);

  buttonCarrinho.addEventListener("click", function (event) {
    const id = parseInt(event.target.id);
    if (!verificaCard(id)) {
      adcionaItem(data);

      document.querySelector(
        "#contagem-Itens"
      ).innerHTML = `Quantidade: ${listaProdutos.length}`;

      document.querySelector(
        "#soma-Itens"
      ).innerText = `Total: R$ ${totalCarrinho()},00 `;

      let card = procuraCard(id);
      criarCart(card);

      lateral.classList.add("interior-carrinho");
    }
  });

  vitrine.appendChild(cardPrincipal);
}

for (let i = 0; i < data.length; i++) {
  criarCard(data[i], vitrine);
}

function carrinhoDeCompras() {
  const elementosCarrinho = document.createElement("div");
  const nameCarrinho = document.createElement("span");
  const interiorCarrinho = document.createElement("span");
  const informacaoCarrinho = document.createElement("div");
  const contagemItens = document.createElement("span");
  const somaItens = document.createElement("span");

  nameCarrinho.innerText = "Carrinho de compras";
  nameCarrinho.classList.add("name-carrinho");
  elementosCarrinho.classList.add("elementos-carrinho");

  informacaoCarrinho.classList.add("informacao-Carrinho");
  contagemItens.classList.add = "contagem-Itens";
  contagemItens.id = "contagem-Itens";
  somaItens.id = "soma-Itens";
  interiorCarrinho.classList.add = "interior-carrinho";

  informacaoCarrinho.appendChild(contagemItens);
  informacaoCarrinho.appendChild(somaItens);
  lateral.appendChild(informacaoCarrinho);
  carrinho.appendChild(nameCarrinho);
  carrinho.appendChild(elementosCarrinho);
  elementosCarrinho.appendChild(interiorCarrinho);
}
carrinhoDeCompras();

function procuraCard(id) {
  for (let i = 0; i < data.length; i++) {
    let card = data[i];
    if (card.id == id) {
      return card;
    }
  }
  return "Produto não encontrado";
}

function verificaCard(id) {
  const element = document.querySelector("#cart" + id);

  if (element === null) {
    return false;
  } else {
    return true;
  }
}
