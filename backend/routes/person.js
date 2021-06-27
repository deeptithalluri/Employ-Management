const sequelize = require("../db/config");
const router = require("express").Router();

const { person } = sequelize.models;

// Get all un assigned person
router.get("/unAssigned", async function (req, res) {
  const allPersons = await person.findAll({
    where: {
      companyId: null,
    },
  });
  res.send(allPersons);
});

// Get all employees in the company
router.get("/", async function (req, res) {
  const response = await person.findAll({
    where: {
      companyId: req.query.companyId,
    },
  });
  res.send(response);
});

// UnAssign a company of the employee
router.patch("/:id/unAssignCompany", async function (req, res) {
  const response = await person.update(
    { companyId: null },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.send(response);
});

// Assign a company to the employee. Company id is available request body.
router.patch("/:id/assignCompany", async function (req, res) {
  const response = await person.update(
    { companyId: req.body.companyId },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  console.log(response);
  res.send(response);
});

// Create a Person
router.post("/", async function (req, res) {
  try {
    const { person } = sequelize.models;
    const result = await person.create({
      name: req.body.name,
      companyId: req.body.companyId,
    });
    res.send(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ message: "Invalid request" });
  }
});

module.exports = router;
