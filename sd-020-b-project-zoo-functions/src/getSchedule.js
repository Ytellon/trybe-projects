const { species, hours } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const verificaAnimal = (animal) => species.some((element) => element.name === animal);
const verificaSemana = (weekday) => Object.keys(hours).includes(weekday);

const horaOficial = (weekday) => {
  const weekDay = hours[weekday];
  return weekday === 'Monday'
    ? 'CLOSED' : `Open from ${weekDay.open}am until ${weekDay.close}pm`;
};

const exibicao = (weekday) => {
  const exibindo = species.filter((e) => e.availability.includes(weekday)).map((e) => e.name);
  return weekday === 'Monday' ? 'The zoo will be closed!' : exibindo;
};

//

const agendaDia = (weekday) => {
  const agenda = {};
  agenda[weekday] = {
    officeHour: `${horaOficial(weekday)}`,
    exhibition: exibicao(weekday),
  };
  return agenda;
};

const agendaSemana = () => {
  let schedule = {};

  Object.keys(hours).forEach((day) => {
    schedule = Object.assign(schedule, agendaDia(day));
  });

  return schedule;
};

const diasAnimais = (animal) => species.find((e) => e.name === animal).availability;

function getSchedule(scheduleTarget) {
  if (verificaSemana(scheduleTarget)) return agendaDia(scheduleTarget);

  if (verificaAnimal(scheduleTarget)) return diasAnimais(scheduleTarget);

  return agendaSemana();
}

console.log(getSchedule('Lions'));

module.exports = getSchedule;
