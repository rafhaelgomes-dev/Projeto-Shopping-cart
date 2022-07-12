require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  test('Execute a função fetchProducts com o argumento computador e teste se fetch foi chamada', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('este se, ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(url);
  });
 
});
