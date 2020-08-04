let PERSON = require("../db/person.json");
let CUSTOMER = require("../db/customer.json");
const helper = require("../utils");
const filename = "db/person.json";

function isValidCustomer(customerId) {
  const customer = CUSTOMER.find((c) => Number(customerId) == c.id);
  console.log("customer....", customer, customerId);
  if (customer && customer.is_active) {
    return true;
  } else {
    return false;
  }
}

function getPersons(customerId) {
  return new Promise((resolve, reject) => {
    if (!isValidCustomer) {
      reject({
        message: "Customer doesnot exist or is inactive",
        status: 404,
      });
    }
    if (PERSON.length === 0) {
      reject({
        message: "no Persons available",
        status: 202,
      });
    }
    const persons = PERSON.filter((P) => P.customer_id == customerId);
    resolve(persons);
  });
}

function getPerson(customerId, id) {
  return new Promise((resolve, reject) => {
    if (!isValidCustomer(customerId)) {
      reject({
        message: "Customer doesnot exist or is inactive",
        status: 404,
      });
    }
    const person = PERSON.find((p) => id === p.id);
    if (!person) {
      reject({
        message: "Id is invalid",
        status: 404,
      });
    }
    resolve(person);
  });
}

function insertPerson(customerId, body) {
  const { first_name, last_name, role } = body;
  return new Promise((resolve, reject) => {
    if (!isValidCustomer(customerId)) {
      reject({
        message: "Customer doesnot exist or is inactive",
        status: 404,
      });
    }
    if (!(first_name || last_name || customer_id || role)) {
      reject({
        message: "Required field missing",
        status: 400,
      });
    }

    const newPerson = {
      id: helper.getNewId(PERSON),
      customer_id: Number(customerId),
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

function updatePerson(customerId, id, newPerson) {
  return new Promise((resolve, reject) => {
    if (!isValidCustomer(customerId)) {
      reject({
        message: "Customer doesnot exist or is inactive",
        status: 404,
      });
    }
    const updates = Object.keys(newPerson);
    console.log("modee", newPerson);
    const allowedUpdates = ["first_name", "last_name", "role", "is_deleted"];
    const isValidUpdates = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdates) {
      reject({
        message: "Invalid operation",
        status: 400,
      });
    }

    const person = PERSON.find(
      (p) => console.log("iidd", id, "p.id", p.id) || id == p.id
    );
    console.log("person", person);
    if (!person) {
      reject({
        message: "Id is invalid",
        status: 404,
      });
    }
    updates.forEach((update) => (person[update] = newPerson[update]));
    helper.writeJSONFile(filename, PERSON);
    resolve(person);
  });
}

function deletePerson(customerId, id) {
  return new Promise((resolve, reject) => {
    /** Soft deletes the person with is_deleted:true flag,
     * In production, deleted data can be removed by invoking a seperate delete fucntion
     * after certain interval of time
     *
     */
    if (!isValidCustomer(customerId)) {
      reject({
        message: "Customer doesnot exist or is inactive",
        status: 404,
      });
    }
    const persons = PERSON.map((person) =>
      id == person.id ? { ...person, is_deleted: true } : person
    );
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
