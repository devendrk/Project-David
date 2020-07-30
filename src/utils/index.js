const uuidGenerator = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const { CUSTOMERS } = require("../db");

const customer = CUSTOMERS.filter((customer) => {
  console.log(customer.is_active);
  return customer.id === 2 && customer.is_active;
});
console.log(customer);
module.exports = uuidGenerator;
