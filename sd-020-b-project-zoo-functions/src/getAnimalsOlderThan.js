const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  return species.find((element) => element.name === animal).residents
    .every((element) => element.age > age);
}

console.log(getAnimalsOlderThan('lions', 8));

module.exports = getAnimalsOlderThan;
