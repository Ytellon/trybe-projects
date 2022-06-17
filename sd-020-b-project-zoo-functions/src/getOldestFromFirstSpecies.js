const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const firstAnimal = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const animalList = data.species.find((specie) => specie.id === firstAnimal).residents;
  const olderAnimal = animalList.reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  return Object.values(olderAnimal);
}

console.log(getOldestFromFirstSpecies('56d43ba3-a5a7-40f6-8dd7-cbb05082383f'));

module.exports = getOldestFromFirstSpecies;

/* const animalArray = data.species.find((specie) => specie.id === firstAnimal).residents;

  const elderAnimal = animalArray.reduce((acc, curr) => (acc.age > curr.age ? acc : curr)); */
