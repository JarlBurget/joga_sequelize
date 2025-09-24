const router = require("express").Router();
const { getAllAuthors, getAuthorById } = require("../controllers/author");

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);

module.exports = router;