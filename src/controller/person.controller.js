const express = require("express");
const router = express.Router();
const person = require("../model/person.model");

/* Insert a new customer */
router.post("/persons", async (req, res) => {
  console.log("reqqqq", req.body);
  await person
    .insertPerson(req.body)
    .then((person) =>
      res.status(201).json({
        message: `The person #${person.id} has been created`,
        content: person,
      })
    )
    .catch((err) => res.status(500).json({ message: err.message }));
});

/* All persons */
router.get("/:customerId/persons", async (req, res) => {
  const { customerId } = req.params;
  console.log("persons", req.params);
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
router.get("/persons/:id", async (req, res) => {
  const id = Number(req.params.id);
  await person
    .getPerson(id)
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
router.put("/persons/:id", async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  await person
    .updatePerson(id, body)
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
router.delete("/persons/:id", async (req, res) => {
  const id = Number(req.params.id);
  console.log("iiiidddele", id, person.deletePerson);
  await person
    .deletePerson(id)
    .then((p) =>
      res.json({
        message: `The person #${id} has been deleted`,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

// const filename = __dirname + "/../db/person.json";

// const validate = require("../validation/index");

// const { uuidGenerator, writeJSONFile } = require("../utils/helper");
// // const { PERSONS } = require("../db");
// const fs = require("fs");

// const idGenerator = () => {
//   const personsList = PERSONS.read();
//   const maxId =
//     personsList.length > 0 ? Math.max(...personsList.map((c) => c.id)) : 0;
//   return maxId + 1;
// };

// const PERSONS = (() => {
//   return { read, write };
//   function read() {
//     const result = fs.readFileSync(filename, "utf8", (err, data) => {
//       return data;
//     });
//     return JSON.parse(result);
//   }

//   function write(path, content) {
//     const result = writeJSONFile(path, content);
//     return result;
//   }
// })();
// const personsList = PERSONS.read();

// /**
//  * Create new person
//  */
// router.post("/persons", validateMiddleware, (req, res) => {
//   // in production Async funciton need to be used
//   const { first_name, last_name, role, is_deleted, customer_id } = req.body;
//   const person = {
//     ...req.body,
//     id: idGenerator(),
//     uuid: uuidGenerator(),
//   };
//   // delete person.first_name;
//   try {
//     if (!(first_name || last_name || role || is_deleted)) {
//       res.status(400).send({ error: "missing name or active status" });
//     }
//     const result = validate(person);
//     if (Object.keys(result).length > 0) {
//       throw result;
//     }
//     const persons = [...personsList, person];
//     const status = PERSONS.write("db/person.json", persons);
//     res.status(status).send(person);
//   } catch (error) {
//     console.log("posttttt", error);
//     res.status(500).send();
//   }
// });

// /**
//  * List of persons
//  */
// router.get("/:cust_id/persons", async (req, res) => {
//   const { cust_id } = req.params;

//   try {
//     const persons = personsList.filter(
//       (person) => console.log(person) || person.customer_id === cust_id
//     );
//     console.log("ppp", cust_id, persons);
//     res.send(persons);
//   } catch (error) {
//     res.status(400).send();
//   }
// });

// /**
//  * List of Active persons
//  */
// router.get("/active-persons", async (req, res) => {
//   try {
//     console.log("active............", PERSONS.read());
//     const persons = await PERSONS.read().filter((person) => !person.is_deleted);
//     console.log("active persons", persons);
//     res.send(persons);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// /**
//  * Get single person
//  */
// router.get("/persons/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   try {
//     const person = personsList.find((person) => person.id === id);
//     if (!person) {
//       return res.status(404).send();
//     }
//     if (person.is_deleted) {
//       return res.status(400).send([]);
//     }

//     res.send(person);
//   } catch (error) {
//     res.status(500).send();
//   }
// });

// /**
//  * Update existing person
//  */
// router.put("/persons/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["first_name", "last_name", "role", "is_deleted"];
//   const isValidUpdates = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//   console.log("uuuu", id, updates, allowedUpdates);
//   try {
//     if (!isValidUpdates) {
//       res.status(400).send({ error: "not a valid operation" });
//     }

//     const [person] = await personsList.filter((person) => person.id === id);
//     console.log("iiiiiiii cus", person);

//     updates.forEach((update) => {
//       console.log("ccc", person[update], req.body[update]);
//       return (person[update] = req.body[update]);
//     });
//     console.log("updated cus", person);
//     res.send(person);
//   } catch (error) {
//     res.send(500).send();
//   }
// });

// /**
//  * Delete person
//  *
//  * In production complete remove of person from database can be done by envoking delete function in predefined time interval.
//  */
// router.delete("/persons/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   try {
//     const persons = personsList.map((person) => {
//       return person.id === id ? { ...person, is_deleted: true } : person;
//     });
//     console.log("persons..............", persons);
//     const status = PERSONS.write("db/person.json", persons);
//     console.log("statusss deleted", status);

//     res.status(204).send();
//   } catch (error) {
//     res.status(500).send();
//   }
// });

// function validateMiddleware(req, res, next) {
//   try {
//     const result = validate(req.body);
//     if (Object.keys(result).length > 0) {
//       throw result;
//     }
//     next();
//   } catch (err) {
//     if (err) {
//       res.send(err);
//     }
//   }
// }

module.exports = router;
