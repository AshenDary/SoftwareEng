const router = require('express').Router();
const { getArticles, getArticle, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');

router.get('/', getArticles);
router.get('/:id', getArticle);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
