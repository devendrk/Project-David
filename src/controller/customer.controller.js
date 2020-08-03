const express = require("express");
const router = express.Router();
const customer = require("../model/customer.model");

/* Insert a new customer */
router.post("/customers", async (req, res) => {
  console.log("reqqqq", req.body);
  await customer
    .insertCustomer(req.body)
    .then((customer) =>
      res.status(201).json({
        message: `The person #${customer.id} has been created`,
        content: customer,
      })
    )
    .catch((err) => res.status(500).json({ message: err.message }));
});

/* All customers */
router.get("/customers", async (req, res) => {
  console.log("ccc", customer);
  await customer
    .getCustomers()
    .then((customer) => res.json(customer))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

/* Customer by id */
router.get("/customers/:id", async (req, res) => {
  const id = Number(req.params.id);
  await customer
    .getCustomer(id)
    .then((customer) => res.json(customer))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

/* Update a Customer */
router.put("/customers/:id", async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  console.log(id, body);
  await customer
    .updateCustomer(id, body)
    .then((customer) =>
      res.json({
        message: `The customer #${id} has been updated`,
        content: customer,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

// /* Delete a person */
// router.delete("/customers/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   await person
//     .deleteCustomer(id)
//     .then((p) =>
//       res.json({
//         message: `The CUstomer #${id} has been deleted`,
//       })
//     )
//     .catch((err) => {
//       if (err.status) {
//         res.status(err.status).json({ message: err.message });
//       }
//       res.status(500).json({ message: err.message });
//     });
// });

module.exports = router;
