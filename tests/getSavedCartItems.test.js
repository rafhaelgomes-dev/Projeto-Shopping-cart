const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  test('Teste se, ao executar saveCartItems com o argumento', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });
});
