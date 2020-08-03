let CUSTOMER = require("../db/customer.json");
const helper = require("../utils");
const filename = "db/customer.json";

function getCustomers() {
  return new Promise((resolve, reject) => {
    if (CUSTOMER.length === 0) {
      reject({
        message: "no Customers available",
        status: 202,
      });
    }
    resolve(CUSTOMER);
  });
}

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    const singleCustomer = CUSTOMER.find((c) => c.id == id);
    if (!singleCustomer) {
      reject({
        message: "Id in not good",
        status: 404,
      });
    }
    resolve(singleCustomer);
  });
}

function insertCustomer(body) {
  console.log("new person", body);
  return new Promise((resolve, reject) => {
    const { name } = body;
    if (!name) {
      reject({
        message: "not a valid operation",
        status: 400,
      });
    }
    const id = helper.getNewId(CUSTOMER);
    const uuid = helper.uuidGenerator();
    newCustomer = { id, uuid, name, is_active: true };
    CUSTOMER.push(newCustomer);
    helper.writeJSONFile(filename, CUSTOMER);
    resolve(newCustomer);
  });
}

function updateCustomer(id, newCustomer) {
  return new Promise((resolve, reject) => {
    const updates = Object.keys(newCustomer);
    const allowedUpdates = ["name", "is_active"];
    const isValidUpdates = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdates) {
      reject({
        message: "not a valid operation",
        status: 400,
      });
    }
    const [person] = CUSTOMER.filter((c) => id === c.id);
    updates.forEach((update) => (person[update] = newCustomer[update]));
    helper.writeJSONFile(filename, CUSTOMER);
    resolve(person);
  });
}

function deleteCustomer(id) {
  return new Promise((resolve, reject) => {
    /** Soft deletes the Customer with is_deleted:true flag,
     * In production, deleted data can be removed by invoking a seperate delete fucntion
     * after certain interval of time
     *
     */
    const customers = CUSTOMER.map((customer) =>
      console.log(typeof customer.id, typeof id, "customerId") ||
      id === customer.id
        ? { ...customer, is_deleted: true }
        : customer
    );
    console.log("after delete", customers);
    helper.writeJSONFile(filename, customers);
    resolve();
  });
}

module.exports = {
  getCustomers,
  getCustomer,
  insertCustomer,
  updateCustomer,
  //   deleteCustomer,
};
