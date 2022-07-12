require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });

  test('Teste se, ao chamar a função fetchItem com o argumento do item MLB1615760527, a função fetch utiliza o endpoint', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  
});
