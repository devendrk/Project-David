const fs = require("fs");

/** In production uuid is automatically genereted */
const uuidGenerator = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/** In Production id is generated automatically */
const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
};

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

module.exports = { getNewId, uuidGenerator, writeJSONFile };
