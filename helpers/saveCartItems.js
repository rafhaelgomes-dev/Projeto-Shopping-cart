const saveCartItems = () => {
  // let cartItem = JSON.parse(localStorage.getItem('cartItems'));
  // if (cartItem === null) {
  //   cartItem = [];
  // }
  // cartItem.push(produtos);
  // localStorage.setItem('cartItems', JSON.stringify(cartItem));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
