require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('testa se fetchProducts é uma function', async () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('testa se fetch com o argumento "computador" é chamado', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  })

  it('testa se ao chamar a função fetchProducts com o argumento "computador" utiliza o end point url', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })
});
