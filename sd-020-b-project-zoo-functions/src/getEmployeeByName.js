const { employees } = require('../data/zoo_data');

function getEmployeeByName(name) {
  if (name === undefined) return {};
  return employees.find((object) =>
    object.firstName === name || object.lastName === name);
}

console.log(getEmployeeByName('Nelson'));

module.exports = getEmployeeByName;
