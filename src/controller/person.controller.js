const express = require("express");
const router = express.Router();
const person = require("../model/person.model");

/* Insert a new customer */
router.post("/customers/:customerId/persons", async (req, res) => {
  const { customerId } = req.params;
  const body = req.body;
  await person
    .insertPerson(customerId, body)
    .then((person) =>
      res.status(201).json({
        message: `The person #${person.id} has been created`,
        content: person,
      })
    )
    .catch((err) => res.status(500).json({ message: err.message }));
});

/* All persons */
router.get("/customers/:customerId/persons", async (req, res) => {
  const { customerId } = req.params;
  console.log("rrr..", customerId);
  await person
    .getPersons(customerId)
    .then((person) => res.json(person))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

/* Person by id */
router.get("/customers/:customerId/persons/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { customerId } = req.params;

  await person
    .getPerson(customerId, id)
    .then((person) => res.json(person))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

/* Update a post */
router.put("/customers/:customerId/persons/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { customerId } = req.params;

  const body = req.body;

  await person
    .updatePerson(customerId, id, body)
    .then((person) =>
      res.json({
        message: `The person #${id} has been updated`,
        content: person,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

/* Delete a person */
router.delete("/customers/:customerId/persons/:id", async (req, res) => {
  const { customerId } = req.params;
  const id = Number(req.params.id);
  await person
    .deletePerson(customerId, id)
    .then((p) =>
      res.json({
        message: `The person #${id} has been removed`,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
