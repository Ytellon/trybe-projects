const { employees } = require('../data/zoo_data');

function isManager(id) {
  return employees.some((element) => element.managers.includes(id));
}

console.log(isManager('c1f50212-35a6-4ecd-8223-f835538526c2'));

function getRelatedEmployees(managerId) {
  if (isManager(managerId) === true) {
    return employees
      .filter((element) => element.managers.includes(managerId))
      .map((employee) => `${employee.firstName} ${employee.lastName}`);
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}

console.log(getRelatedEmployees('9e7d4524-363c-416a-8759-8aa7e50c0992'));
module.exports = { isManager, getRelatedEmployees };
