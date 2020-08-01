const fs = require("fs");

const uuidGenerator = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const CUSTOMERS = require("../db/customer.json");

const customer = CUSTOMERS.filter((customer) => {
  console.log(customer.is_active);
  return customer.id === 2 && customer.is_active;
});

function writeJSONFile(path, content) {
  try {
    fs.writeFileSync(
      __dirname + `/../${path}`,
      JSON.stringify(content, null, 4),
      "utf8"
    );
    return 201;
  } catch (err) {
    return err;
  }
}

module.exports = { uuidGenerator, writeJSONFile };
