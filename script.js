const classItems = document.getElementsByClassName('items')[0];
const olClassCart = document.getElementsByClassName('cart__items')[0];
const buttonLimpar = document.getElementsByClassName('empty-cart')[0];
const h3 = document.getElementsByClassName('total-price')[0];
buttonLimpar.addEventListener('click', () => {
  olClassCart.innerText = '';
  h3.innerText = 'R$ 0,00';
});

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const computadores = [];

const product = async () => {
  const arrayProduct = await fetchProducts();
  arrayProduct.forEach((element) => {
   computadores.push(element);
  });
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const calculaValorTotal = () => {
  const olClassCart2 = document.querySelectorAll('.cart__item');
  const precos = [];
  let valorFinal = 0;
  olClassCart2.forEach((element) => {
    const array = element.innerText.split('$');
    precos.push(array[array.length - 1]);
  });
  precos.forEach((element) => {
    valorFinal += Math.round(element * 100) / 100;
  });
  h3.innerText = `R$ ${valorFinal}`;
};

const cartItemClickListener = (event) => {
  const li = event.target;
  li.remove();
  calculaValorTotal();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `<img src="${sku}"> ${name} | Preço: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  valorParaSubtrair = salePrice;
  olClassCart.appendChild(li);
};

const capturaProdutoSelecionado = async (index) => {
  const idDoproduto = computadores[index].id;
  const produtoSelecionado = await fetchItem(idDoproduto);
  const obj = {
    sku: produtoSelecionado.thumbnail,
    name: produtoSelecionado.title,
    salePrice: produtoSelecionado.price,
  };
  createCartItemElement(obj);
  calculaValorTotal();
};

const capturaIndexDoProduto = () => {
  const buttonAddCart = document.querySelectorAll('.item__add');
  buttonAddCart.forEach((element) => {
    element.addEventListener('click', (event) => {
       const index = event.target.id;
       capturaProdutoSelecionado(index);
    });
  });
};

const addproductlist = async () => {
  await product();
  computadores.forEach((element, index) => {
    const obj = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,  
    };
    const produtos = createProductItemElement(obj);
    classItems.appendChild(produtos);
    const buttonAddCart = document.getElementsByClassName('item__add')[index];
    buttonAddCart.id = index;
  });
  capturaIndexDoProduto();
};

window.onload = async () => { 
 await addproductlist();
 calculaValorTotal();
};
