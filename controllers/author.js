const { Article, Author } = require("../models");

const getAllAuthors = async (req, res) => {
	try {
		const authors = await Author.findAll();
		res.json(authors);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

const getAuthorById = async (req, res) => {
	const { id } = req.params;
	try {
		const author = await Author.findByPk(id, {
            include: [{ model: Article }],
        });
		if (!author) {
			return res.status(404).json({ error: "Author not found" });
		}
		res.json(author);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	getAllAuthors,
	getAuthorById,
};