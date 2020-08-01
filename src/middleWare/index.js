function checkFieldsPerson(req, res, next) {
  const { first_name, last_name, role } = req.body;
  console.log("request", req.body);
  if (!first_name && last_name && role) {
    res.status(400).json({ message: "Required all fields" });
  }
  next();
}

module.exports = checkFieldsPerson;
