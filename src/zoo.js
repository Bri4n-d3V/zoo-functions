/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
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

// eslint-disable-next-line sonarjs/cognitive-complexity
function getAnimalMap(options = {}) {
  if (!options.includeNames) { // teste 1 e 6;
    const obj = { NE: [], NW: [], SE: [], SW: [] }; // objeto a ser retornado sem paraâmetro;
    species.forEach((animal) => {
      obj[animal.location].push(animal.name);
    }); // func filta animais de acordo com local e add em arrray;
    return obj; // retorno sem parâmetro;
  }

  if (options.includeNames && options.sex && options.sorted) { // teste 5;
    const obj = { NE: [], NW: [], SE: [], SW: [] }; // objeto a ser retornado sem paraâmetro;
    species.forEach((animal) => {
      obj[animal.location].push({ [animal.name]:
        animal.residents.filter((resident) =>
          (resident.sex === options.sex)).map((resident) =>
          resident.name).sort() });
    });
    return obj;
  }

  if (options.includeNames && options.sorted) { // teste 3;
    const obj = { NE: [], NW: [], SE: [], SW: [] }; // objeto a ser retornado sem paraâmetro;
    species.forEach((animal) => {
      obj[animal.location].push({ [animal.name]:
        animal.residents.map((resident) => resident.name).sort() });
    });
    return obj;
  }

  if (options.includeNames && options.sex) { // teste 4;
    const obj = { NE: [], NW: [], SE: [], SW: [] }; // objeto a ser retornado sem paraâmetro;
    species.forEach((animal) => {
      obj[animal.location].push({ [animal.name]:
        animal.residents.filter((resident) =>
          (resident.sex === options.sex)).map((resident) =>
          resident.name) });
    });
    return obj;
  }

  if (options.includeNames) { // teste 2;
    const obj = { NE: [], NW: [], SE: [], SW: [] }; // objeto a ser retornado sem paraâmetro;
    species.forEach((animal) => {
      obj[animal.location].push({ [animal.name]:
        animal.residents.map((resident) => resident.name) });
    });
    return obj;
  }
}
// getAnimalMap({ includeNames: true, sex: 'male', sorted: true });

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

/* const IdInName = (arrIds) => {
    const newArr = [];
    arrIds.forEach((id) => {
      species.forEach((animal) => {
        if (animal.id === id) {
          newArr.push(animal.name);
        }
      });
    });
    return newArr;
  }; */
function getEmployeeCoverage(idOrName) {
  const obj = {};
  const resp = employees.map((worker) => worker.responsibleFor);
  const IdInName = (arrIds) => arrIds.reduce((acc, id) => (
    acc.concat(species.find((animal) => animal.id === id).name)
  ), []); // função recebe array de ids e devolve array de nomes;
  employees.forEach((worker, i) => {
    obj[`${worker.firstName} ${worker.lastName}`] = IdInName(resp[i]);
  }); // função que adiciona chaves com valores no objeto criado;
  const newObj = {};
  employees.forEach((element) => {
    if (idOrName === element.firstName
      || idOrName === element.lastName
      || idOrName === element.id) {
      newObj[`${element.firstName} ${element.lastName}`] = IdInName(element.responsibleFor);
    }
  }); // função que adiciona chave com valor filtrados no objeto criado;
  return (!idOrName) ? obj : newObj;
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
