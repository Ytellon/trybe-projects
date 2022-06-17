const data = require('../data/zoo_data');

// primeira funcao para caso o parametro for vazio, contar a quantidade de animais passados no param objeto.

const quantityAnimals = data.species.reduce((acc, element) => {
  acc[element.name] = element.residents.length;
  return acc;
}, {});

// funcao para encontrar o tipo de especie usando find e contando com length.

const specieCounter = (animalsOb) => {
  const catchAnimal = data.species.find((element) => animalsOb.specie === element.name);
  return catchAnimal.residents.length;
};

const specieLog = (animalsOb) => {
  const findAnimals = data.species.find((specie) => animalsOb.specie === specie.name);
  const countSex = findAnimals.residents.filter((animal) => animal.sex === animalsOb.sex);
  return countSex.length;
};

function countAnimals(animal) {
  if (!animal) return quantityAnimals;
  if ('specie' in animal && 'sex' in animal) return specieLog(animal);
  return specieCounter(animal);
}

module.exports = countAnimals;
