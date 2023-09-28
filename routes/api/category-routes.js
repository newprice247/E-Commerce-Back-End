const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // finds all categories
  Category.findAll({
    // inludes its associated Products
    include: [ Product ]
  })
  .then((categories) => res.json(categories))
  .catch((err) => { res.json(err) });
});

router.get('/:id', (req, res) => {
  // finds one category by its `id` value
  Category.findOne({
    where: { id: req.params.id },
    // inludes its associated Products
    include: [ Product ]
  })
  .then((category) => res.json(category))
  .catch((err) => { res.json(err) });
});

router.post('/', (req, res) => {
  // creates a new category
  Category.create(req.body)
  .then((category) => res.json(category))
  .catch((err) => { res.json(err) });
});

router.put('/:id', (req, res) => {
  // updates a category by its `id` value
  Category.update(req.body, { where: { id: req.params.id } })
  .then((category) => res.json(category))
  .catch((err) => { res.json(err) });
});

router.delete('/:id', (req, res) => {
  // deletes a category by its `id` value
  Category.destroy({ where: { id: req.params.id } })
  .then(() => res.json({ message: 'Category deleted' }))
});

module.exports = router;
