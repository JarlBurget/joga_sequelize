const express = require('express');
const router = express.Router();
const articleAdminController = require('../../controllers/admin/article')

router.post('/article/create', articleAdminController.createArticle);

router.get('/article/edit/:id', articleAdminController.updateArticle);
router.post('/article/edit/:id', articleAdminController.updateArticle);



module.exports = router;