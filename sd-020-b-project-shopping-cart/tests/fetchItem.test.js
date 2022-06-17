require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('testa se fetchItem é uma function', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('testa se ao executar a função fetchItem com argumento do item "MLB1615760527" o fetch foi chamado', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled;
  })
});
