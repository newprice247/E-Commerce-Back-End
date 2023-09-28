const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // finds all tags
  Tag.findAll({
    //includes its associated Product data, using through: ProductTag
    include: [ { model:Product, through:ProductTag } ]
  })
  .then((tags) => res.json(tags))
  .catch((err) => res.json(err));
});

router.get('/:id', (req, res) => {
  // finds a single tag by its `id`
  Tag.findOne({
    where: { id: req.params.id },
    //includes its associated Product data, using through: ProductTag
    include: [ { model:Product, through:ProductTag } ]
  })
  .then((tag) => res.json(tag))
  .catch((err) => res.json(err));
});

router.post('/', (req, res) => {
  // creates a new tag
  Tag.create(req.body)
  .then((tag) => res.json(tag))
  .catch((err) => res.json(err));
});

router.put('/:id', (req, res) => {
  // updates a tag's name by its `id` value
  Tag.update(req.body, { where: { id: req.params.id } })
  .then((tag) => res.json(tag))
  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // deletes on tag by its `id` value
  Tag.destroy({ where: { id: req.params.id } })
  .then(() => res.json({ message: 'Tag deleted' }))
  .catch((err) => res.json(err));
});

module.exports = router;
