const { addEmployee } = require("../controllers/employeeControllers");
const employeeRouter = require("express").Router();

employeeRouter.post("/insert", addEmployee);

module.exports = employeeRouter;
