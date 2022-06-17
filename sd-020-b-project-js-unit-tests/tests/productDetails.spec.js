const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Testa se productDetails é uma função.', () => {
    expect(typeof productDetails).toBe('function');
  });

  it('Testa se o retorno da função é um array.', () => {
    expect(Array.isArray(productDetails('Alcool gel', 'Máscara'))).toBe(true);
  });

  it('Teste se o array retornado pela função contém dois itens dentro.', () => {
    expect(productDetails('Alcool gel','Máscara').length).toBe(2);
  });

  it('Testa se os dois itens dentro do array retornado pela função são objetos', () => {
    expect(typeof productDetails('Alcool gel', 'Máscara')).toBe('object');
  });

  it('Testa se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.', () => {
    expect(productDetails('Alcool gel', 'Máscara')[0]).not.toEqual(productDetails('Alcool gel', 'Máscara')[1]);
  });

});
