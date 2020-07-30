const express = require("express");
const router = express.Router();

const uuidGenerator = require("../utils/index");
const { CUSTOMERS, PERSONS } = require("../db");

const idGenerator = () => {
  const maxId = PERSONS.length > 0 ? Math.max(...PERSONS.map((c) => c.id)) : 0;
  return maxId + 1;
};

/**
 * Create new person
 */
router.post("/persons", async (req, res) => {
  const { first_name, last_name, role, is_deleted } = req.body;
  console.log("name", first_name, role, last_name, is_deleted);
  const person = {
    id: idGenerator(),
    uuid: uuidGenerator(),
    first_name: first_name,
    last_name: last_name,
    role: role,
    is_deleted: is_deleted,
  };
  try {
    if (!(first_name || last_name || role || is_deleted)) {
      res.status(400).send({ error: "missing name or active status" });
    }
    const persons = await [...PERSONS, person];
    console.log("added cuss", persons);
    res.status(201).send(person);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 * List of persons
 */
router.get("/persons", async (req, res) => {
  try {
    const persons = await PERSONS.map((person) => person);
    res.send(persons);
  } catch (error) {
    res.status(400).send(e);
  }
});

/**
 * Get single person
 */
router.get("/persons/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const person = PERSONS.find((person) => person.id === id);
    if (!person) {
      return res.status(404).send();
    }
    res.send(person);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 * Update existing person
 */
router.put("/persons/:id", async (req, res) => {
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
    const [person] = await PERSONS.filter((person) => person.id === id);
    console.log("iiiiiiii cus", person);

    updates.forEach((update) => {
      console.log("ccc", person[update], req.body[update]);
      return (person[update] = req.body[update]);
    });
    console.log("updated cus", person);
    res.send(person);
  } catch (error) {
    res.send(500).send();
  }
});

/**
 * Delete person
 *
 * In production complete remove of person from database by envoking hard delete function in predefined time interval.
 */
router.delete("/persons/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const persons = await PERSONS.map((person) =>
      person.id === id ? { ...PERSONS, is_deleted: false } : person
    );
    console.log("persons", persons);
    res.status(204).send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
