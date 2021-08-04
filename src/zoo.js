const { species, employees } = require('./data');
const data = require('./data');

// Ajuda de Biza e Martin para fazer os valores dentro do parametro ids serem retornados (ids.some)
function getSpeciesByIds(...ids) {
  return species.filter((animal) => ids.some((id) => animal.id === id));
}

// Ajuda do Martin com a ideia de entrar dentro da espécie de cada animal.
// catchAnimal.residents entra dentro do array dos residentes, com isso podemos entrar na chave age de cada um.
function getAnimalsOlderThan(animal, age) {
  const sameName = species.some((specie) => specie.name === animal);
  const catchAnimal = species.find((specie) => specie.name === animal);
  const older = catchAnimal.residents.every((value) => value.age > age);

  return (sameName && older);
}

function getEmployeeByName(employeeName) {
  const firstName = employees.find((worker) => worker.firstName === employeeName);
  const lastName = employees.find((worker) => worker.lastName === employeeName);

  if (firstName) return firstName;
  if (lastName) return lastName;
  return {};
}

// Ajuda do Martin e Daniel para usar o object destruction.
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
  // return console.log(Object.assign(personalInfo, associatedWith));
}
createEmployee({
  id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
  firstName: 'John',
  lastName: 'Doe',
}, {
  managers: [
    'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
    '9e7d4524-363c-416a-8759-8aa7e50c0992',
  ],
  responsibleFor: [
    '0938aa23-f153-4937-9f88-4858b24d6bce',
    '89be95b3-47e4-4c5b-b687-1fabf2afa274',
    'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5',
  ],
});

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(animal) {
  // seu código aqui
}

function calculateEntry(entrants) {
  // seu código aqui
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
