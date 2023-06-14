const express = require("express");

const { getUsers, updateUser, postUsers } = require("./user.controller");
const router = express.Router();

router.get("/", getUsers);
router.post("/", postUsers);
router.put("/:id", updateUser);

module.exports = router;
