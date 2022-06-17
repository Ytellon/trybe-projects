const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const result = {
    child: entrants.filter((visitor) => visitor.age < 18).length,
    adult: entrants.filter((visitor) => visitor.age > 17 && visitor.age < 50).length,
    senior: entrants.filter((visitor) => visitor.age > 49).length,
  };
  return result;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;

  const { prices } = data;
  const { child, adult, senior } = countEntrants(entrants);
  const totalEntrys = child * prices.child + adult * prices.adult + senior * prices.senior;
  return totalEntrys;
}

console.log(calculateEntry());
module.exports = { calculateEntry, countEntrants };
