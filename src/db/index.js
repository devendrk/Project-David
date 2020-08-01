const fs = require("fs");
const personDb = __dirname + "/person.json";

function Persons() {
  return { read };

  async function read() {
    await fs.readFile(personDb, (err, docs) => {
      if (err) {
        return err;
      }
      console.log("dddddddddddd", docs);
      return docs;
    });
  }
}

module.exports = { Persons };
