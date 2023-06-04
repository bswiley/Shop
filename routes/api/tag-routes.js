const router = require('express').Router();
const { Tag, Product, Category } = require('../../models');

// The `/api/tags` endpoint
router.route('/')
  .get(async (req, res) => {
    try {
      // find all tags and perform JOINs to include all associated products and categories
      const tagData = await Tag.findAll({
        include: [{ model: Product }, { model: Category }],
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  })

  // create a new tag
  .post((req, res) => {
    Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const tagData = await Tag.findByPk(req.params.id, {
        include: [{ model: Product }],
      });

      if (!tagData) {
        res.status(404).json({ message: 'No tag with this id!' });
        return;
      }

      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .put(async (req, res) => {
    try {
      const tagData = await Tag.update(req.body, {
        where: {
          id: req.params.id
        }
      });

      if (!tagData[0]) {
        res.status(404).json({ message: 'No tag with this id!' });
        return;
      }

      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
      });

      if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
      }

      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
