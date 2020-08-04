let PERSON = require("../db/person.json");
const helper = require("../utils");
const filename = "db/person.json";

function getPersons(customerId) {
  return new Promise((resolve, reject) => {
    if (PERSON.length === 0) {
      reject({
        message: "no Persons available",
        status: 202,
      });
    }
    const persons = PERSON.filter((P) => P.customer_id === customerId);
    resolve(persons);
  });
}

function getPerson(id) {
  return new Promise((resolve, reject) => {
    const singlePerson = PERSON.find((p) => p.id == id);
    if (!singlePerson) {
      reject({
        message: "Id in not good",
        status: 404,
      });
    }
    resolve(singlePerson);
  });
}

function insertPerson(body) {
  const { first_name, last_name, customer_id, role } = body;
  return new Promise((resolve, reject) => {
    if (!(first_name || last_name || customer_id || role)) {
      reject({
        message: "Required field missing",
        status: 400,
      });
    }
    const newPerson = {
      id: helper.getNewId(PERSON),
      customer_id: customer_id,
      first_name: first_name,
      last_name: last_name,
      role: role,
      is_deleted: false,
    };
    PERSON.push(newPerson);
    helper.writeJSONFile(filename, PERSON);
    resolve(newPerson);
  });
}

function updatePerson(id, newPerson) {
  return new Promise((resolve, reject) => {
    const updates = Object.keys(newPerson);
    console.log("modee", newPerson);
    const allowedUpdates = ["first_name", "last_name", "role", "is_deleted"];
    const isValidUpdates = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdates) {
      reject({
        message: "not a valid operation",
        status: 400,
      });
    }

    const [person] = PERSON.filter((p) => id === p.id);
    updates.forEach((update) => (person[update] = newPerson[update]));
    helper.writeJSONFile(filename, PERSON);
    resolve(person);
  });
}

function deletePerson(id) {
  return new Promise((resolve, reject) => {
    /** Soft deletes the person with is_deleted:true flag,
     * In production, deleted data can be removed by invoking a seperate delete fucntion
     * after certain interval of time
     *
     */
    const persons = PERSON.map((person) =>
      id === person.id ? { ...person, is_deleted: true } : person
    );
    console.log("after delete", persons);
    helper.writeJSONFile(filename, persons);
    resolve();
  });
}
module.exports = {
  getPersons,
  getPerson,
  insertPerson,
  updatePerson,
  deletePerson,
};
