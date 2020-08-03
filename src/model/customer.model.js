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
    return new Promise((resolve, reject) => {
      helper
        .mustBeInArray(customer, id)
        .then((post) => resolve(post))
        .catch((err) => reject(err));
    });
  });
}

function insertCustomer(body) {
  return new Promise((resolve, reject) => {
    const id = { id: helper.getNewId(customer) };
    const is_active = false;
    console.log("new", newCustomer);
    newCustomer = { ...id, ...newCustomer, is_active };
    customer.push(newCustomer);
    helper.writeJSONFile(filename, customer);
    resolve(newCustomer);
  });
}

function updateCustomer(id, newCustomer) {
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

function deleteCustomer(id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(customer, id)
      .then(() => {
        customers = customer.filter((p) => p.id !== id);
        helper.writeJSONFile(filename, customers);
        resolve();
      })
      .catch((err) => reject(err));
  });
}

module.exports = {
  getCustomers,
  getCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
