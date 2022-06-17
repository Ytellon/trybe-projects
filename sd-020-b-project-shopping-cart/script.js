const ol = document.querySelector('.cart__items');
const button = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const removed = event.target;
  removed.remove(event.target);
  // const ol = document.querySelector('.cart__items');
  saveCartItems(ol.innerHTML);
}

function deleteAllItems() {
  ol.innerHTML = '';
  saveCartItems(ol.innerHTML);
}

button.addEventListener('click', deleteAllItems);

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function loadingItens() {
  // const ol = document.querySelector('.cart__items');
  ol.innerHTML = getSavedCartItems();
  ol.addEventListener('click', cartItemClickListener);
}

async function createCardAdd(event) {
  const id = event.target.parentElement.firstChild.innerText;
  const item = await fetchItem(id);

  const elementCart = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  // const ol = document.querySelector('.cart__items');
  ol.appendChild(createCartItemElement(elementCart));
  saveCartItems(ol.innerHTML);
}

const createElement = async () => {
  const itens = document.querySelector('.items');
  const dados = await fetchProducts('computador');
  dados.results.forEach((product) => {
    const products = { sku: product.id, name: product.title, image: product.thumbnail };
    const teste = createProductItemElement(products);
    itens.appendChild(teste);
    teste.querySelector('.item__add').addEventListener('click', createCardAdd);
  });
};

window.onload = async () => {
  await createElement();
  loadingItens();
};
