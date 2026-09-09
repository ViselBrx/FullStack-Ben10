const express = require("express");

const router = express.Router();

const { listar } = require("../controllers/series.controllers");

router.get("/listar", listar);

module.exports = router;
