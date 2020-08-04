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
    const singleCustomer = CUSTOMER.find((p) => p.id == id);
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
  const { name, is_active } = body;
  return new Promise((resolve, reject) => {
    if (!name) {
      reject({
        message: "Required field missing",
        status: 400,
      });
    }
    const newCustomer = {
      id: helper.getNewId(CUSTOMER),
      uuid: helper.uuidGenerator(),
      name: name,
      is_active: is_active || true,
    };
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

    const [customer] = CUSTOMER.filter((p) => id === p.id);
    updates.forEach((update) => (customer[update] = newCustomer[update]));
    helper.writeJSONFile(filename, CUSTOMER);
    resolve(customer);
  });
}

function deleteCustomer(id) {
  return new Promise((resolve, reject) => {
    /** Soft deletes the person with is_deleted:true flag,
     * In production, deleted data can be removed by invoking a seperate delete fucntion
     * after certain interval of time
     */
    const customers = CUSTOMER.map((c) =>
      id === c.id ? { ...c, is_active: false } : c
    );
    helper.writeJSONFile(filename, customers);
    resolve();
  });
}

module.exports = {
  getCustomers,
  getCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
