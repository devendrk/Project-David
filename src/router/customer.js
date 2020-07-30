const express = require("express");
const router = express.Router();

const uuidGenerator = require("../utils/index");
const { CUSTOMERS } = require("../db");

const idGenerator = () => {
  const maxId =
    CUSTOMERS.length > 0 ? Math.max(...CUSTOMERS.map((c) => c.id)) : 0;
  return maxId + 1;
};

/**
 * Create new customer
 * In production there should be validation using userName or email
 */
router.post("/customers", async (req, res) => {
  const { name } = req.body;
  const customer = {
    id: idGenerator(),
    uuid: uuidGenerator(),
    name: name,
    is_active: true,
  };
  try {
    if (!name) {
      res.status(400).send({ error: "missing name or active status" });
    }

    const customers = await [...CUSTOMERS, customer];
    console.log("added cuss", customers);
    res.status(201).send(customer);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 * List of All customers
 */
router.get("/customers", async (req, res) => {
  try {
    const customers = await CUSTOMERS.filter((customer) => customer);
    console.log("ccc", customers);
    res.send(customers);
  } catch (error) {
    res.status(400).send(e);
  }
});

/**
 * List of Active customers
 */
router.get("/active-customers", async (req, res) => {
  try {
    const customers = await CUSTOMERS.filter((customer) => customer.is_active);
    console.log("ccc", customers);
    res.send(customers);
  } catch (error) {
    res.status(400).send(e);
  }
});

/**
 * Get single customer
 */
router.get("/customers/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const customer = CUSTOMERS.filter(
      (customer) => customer.id === id && customer.is_active
    );
    console.log("cu length", customer.length);
    if (customer.length === 0) {
      return res.status(404).send({ error: "Customer does not exist" });
    }
    res.send(customer);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 * Update existing customer
 */
router.put("/customers/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "is_active"];
  const isValidUpdates = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  console.log("uuuu", id, updates, allowedUpdates);
  try {
    if (!isValidUpdates) {
      res.status(400).send({ error: "not a valid operation" });
    }
    const [customer] = await CUSTOMERS.filter((customer) => customer.id === id);
    updates.forEach((update) => {
      console.log("ccc", customer[update], req.body[update]);
      return (customer[update] = req.body[update]);
    });
    console.log("updated cus", customer);
    res.send(customer);
  } catch (error) {
    res.send(500).send();
  }
});

/**
 * Delete customer
 * In production, inactive customer can be removed from database after certain interval of inactiveness using some time rleated logic.
 */
router.delete("/customers/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    customers = await CUSTOMERS.map((customer) =>
      customer.id === id ? { ...customer, is_active: false } : customer
    );
    console.log("customers", CUSTOMERS);
    res.status(204).send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
