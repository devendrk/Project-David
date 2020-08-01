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

function insertPerson(newPerson) {
  console.log("new person", newPerson);
  return new Promise((resolve, reject) => {
    const id = { id: helper.getNewId(PERSON) };
    newPerson = { ...id, ...newPerson };
    PERSON.concat(newPerson);
    helper.writeJSONFile(filename, PERSON);
    resolve(newPerson);
  });
}

function updatePerson(id, newCustomer) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(customer, id)
      .then((c) => {
        const index = customer.findIndex((p) => p.id == c.id);
        id = { id: c.id };
        customer[index] = { ...id, ...newCustomer };
        helper.writeJSONFile(filename, customer);
        resolve(customer[index]);
      })
      .catch((err) => reject(err));
  });
}

function deletePerson(id) {
  return new Promise((resolve, reject) => {
    /** Soft deletes the person with is_deleted:true flag,
     * In production, deleted data can be removed by invoking a seperate delete fucntion
     * after certain interval of time
     *
     */
    console.log("iiiiiiiiiiii...", id, PERSON);
    // if (!id) {
    //   reject({
    //     message: "no Persons available",
    //     status: 202,
    //   });
    // }
    PERSON.map((p) =>
      console.log("p", p) || p.id === id ? { ...p, is_deleted: false } : person
    );
    console.log("after delete");
    // helper.writeJSONFile(filename, persons);
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
