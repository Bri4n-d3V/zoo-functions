const {
  species,
  employees,
  prices,
  hours,
} = require('./data');
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
  return {
    ...personalInfo,
    ...associatedWith,
  };
  // return console.log(Object.assign(personalInfo, associatedWith));
}

// Ajuda do Rod com refatoramento do código.
function isManager(id) {
  return employees.some((ident) => ident.managers.some((idManager) => idManager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// Consulta ao código do Oliveira para manipulação de objetos;
function countAnimals(singleAnimal) {
  const obj = {};

  species.forEach((animal) => {
    obj[animal.name] = animal.residents.length;
  });

  // se o parametro estiver vazio, retorna obj com species.name como chave e species.residents.length como valor; se o parametro estiver com species.name, recebe species.residents.length;
  return !singleAnimal ? obj : species.find((animal) =>
    animal.name === singleAnimal).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;

  const {
    Adult = 0, Senior = 0, Child = 0,
  } = entrants;

  const adult = prices.Adult * Adult;
  const senior = prices.Senior * Senior;
  const child = prices.Child * Child;

  return adult + senior + child;
}

function getAnimalMap(options) {
  // seu código aqui
}

// Ajuda do Pablo para trabalhar entre arrays e objetos;
function getSchedule(dayName) {
  const entries = Object.entries(hours);
  const obj = {};

  entries.forEach((day) => {
    if (day[1].open === 0 && day[1].close === 0) {
      obj[day[0]] = 'CLOSED';
      return obj;
    }
    obj[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    return obj;
  });

  if (!dayName) return obj;
  if (dayName) {
    const newObj = {};
    newObj[dayName] = obj[dayName];
    return newObj;
  }
}

// SOZINHOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!
function getOldestFromFirstSpecies(id) {
  const findEmployee = employees.find((worker) => worker.id === id);
  const firstAnimalResp = findEmployee.responsibleFor[0];
  const residentAnimals = species.find((animal) => animal.id === firstAnimalResp).residents;
  const sortResidents = residentAnimals.sort((a, b) => b.age - a.age);

  return (Object.values(sortResidents[0]));
}

// Ajuda do Oliveira para o arredondamento correto.
function increasePrices(percentage) {
  const add = percentage / 100 + 1;
  prices.Adult = Math.round((prices.Adult * add) * 100) / 100;
  prices.Senior = Math.round((prices.Senior * add) * 100) / 100;
  prices.Child = Math.round((prices.Child * add) * 100) / 100;

  return prices;
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
