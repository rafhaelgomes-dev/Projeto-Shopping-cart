const classItems = document.getElementsByClassName('items')[0];
const olClassCart = document.getElementsByClassName('cart__items')[0];

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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const li = event.target;
  li.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  olClassCart.appendChild(li);
};

const updateCart = () => {
  const dbProdutos = getSavedCartItems();
  dbProdutos.forEach((elemento) => {
    const obj = {
      sku: elemento.sku,
      name: elemento.name,
      salePrice: elemento.salePrice,
    };
    createCartItemElement(obj);
  });
};

const capturaProdutoSelecionado = async (index) => {
  const idDoproduto = computadores[index].id;
  const produtoSelecionado = await fetchItem(idDoproduto);
  const obj = {
    sku: produtoSelecionado.id,
    name: produtoSelecionado.title,
    salePrice: produtoSelecionado.price,
  };
  saveCartItems(obj);
  olClassCart.innerText = '';
       updateCart();
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

const addproductCart = () => {

};

window.onload = () => { 
  addproductlist();
  olClassCart.innerText = '';
  updateCart();
};
