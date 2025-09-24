// connection to database
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root/qwerty@localhost:3306/joga_sequelize');

// read models data for table representations
const models = require('../../models')

// create new article into data table
const createArticle = (req, res) => {
    let { name, slug, image, body } = req.body;

    models.Article.create({
        name,
        slug,
        image,
        body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })
    .then(article => res.status(200).json({ message: 'New article is added', article }))
    .catch(error => res.status(500).send(error.message));
};

// edit an article in the data table
const updateArticle = async (req, res) => {
    const { id } = req.params;
    console.log('Request method:', req.method);

    if (req.method === 'GET') {
        try {
            const article = await models.Article.findByPk(id);
            const authors = await models.Author.findAll({ attributes: ['id', 'name'] });

            if (!article) return res.status(404).send('Article not found');

            res.status(200).json({ 
                message: 'Article data collected for update',
                article: article,
                authors: authors
            });
        } catch (error) {
            console.error('Error retrieving article data:', error);
            res.status(500).send('Error retrieving article data');
        }
    } else if (req.method === 'POST') {
        try {
            const data = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                author_id: req.body.author_id
            };
            const result = await models.Article.update(data, { where: { id } });

            if (result[0] > 0) {
                res.status(200).json({ message: 'Article is updated', article: data });
            } else {
                res.status(404).send('No rows updated - article not found or data not changed');
            }
        } catch (error) {
            res.status(500).send('Error updating article: ' + error.message);
        }
    }
};

// delete an article by ID
const deleteArticle = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await models.Article.destroy({ where: { id } });

        if (result) {
            res.status(200).json({ message: `Article with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ message: `Article with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error: error.message });
    }
};

// export functions
module.exports = {
    createArticle,
    updateArticle,
    deleteArticle
};
