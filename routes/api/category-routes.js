const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router
.route ('/')
// find all categories
// including its associated Products
.get(async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      // Add Book as a second model to JOIN with
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
})
// create a new category
.post(async (req, res) => {
   try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
})
 // find one category by its `id` value
  // be sure to include its associated Products
router
.route('/:id')
.get(async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // Add Book as a second model to JOIN with
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;}

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }})
  
// update a category by its `id` value
.put(async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
})
// delete a category by its `id` value
.delete(async (req, res) => {
  try {
    const readerData = await Reader.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!readerData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(readerData);
  } catch (err) {
    res.status(500).json(err);
  }
}); 

module.exports = router;