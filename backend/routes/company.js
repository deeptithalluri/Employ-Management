const sequelize = require("../db/config");
const router = require("express").Router();

const { company } = sequelize.models;

// Get all companies
router.get("/", async function (req, res) {
  const allCompanies = await company.findAll();
  res.send(allCompanies);
});

// Create a company
router.post("/", async function (req, res) {
  try {
    const result = await company.create({
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
