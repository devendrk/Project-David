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
    PERSON.push(newPerson);
    helper.writeJSONFile(filename, PERSON);
    resolve(newPerson);
  });
}

function updatePerson(id, newCustomer) {
  return new Promise((resolve, reject) => {
     const id = Number(req.params.id);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["first_name", "last_name", "role", "is_deleted"];
  const isValidUpdates = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  console.log("uuuu", id, updates, allowedUpdates);
  try {
    if (!isValidUpdates) {
      res.status(400).send({ error: "not a valid operation" });

  }
  );
}

function deletePerson(id) {
  return new Promise((resolve, reject) => {
    /** Soft deletes the person with is_deleted:true flag,
     * In production, deleted data can be removed by invoking a seperate delete fucntion
     * after certain interval of time
     *
     */
    console.log("iiiiiiiiiiii...", id);
    // if (!id) {
    //   reject({
    //     message: "no Persons available",
    //     status: 202,
    //   });
    // }
    const persons = PERSON.map((person) =>
      console.log(typeof person.id, typeof id, "personId") || id === person.id
        ? { ...person, is_deleted: true }
        : person
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
