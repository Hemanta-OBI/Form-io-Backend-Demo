const express = require("express");
const router = express.Router();
const formJsonController = require("../controllers/formJsonController");
router.delete("/form-component", formJsonController.removeFormField);
router.get("/forms", formJsonController.getAllFroms);

router.post("/add-form", formJsonController.addNewFrom);

module.exports = router;
