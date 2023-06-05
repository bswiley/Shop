const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.route('/')
  .get((req, res) => {
    console.log('======================');
    Product.findAll({
      attributes: ['id', 'product_name', 'price', 'stock'],
      include: [
        {
          model: Category,
          attributes: ['category_name']
        },
        {
          model: Tag,
          attributes: ['tag_name'],
          through: ProductTag,
          as: 'tags'
        }
      ]
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  })
  .post((req, res) => {
    /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
    */
    Product.create(req.body)
      .then((product) => {
        // if there are product tags, we need to create pairings to bulk create in the ProductTag model
        if (req.body.tagIds && req.body.tagIds.length) {
          const productTagIdArr = req.body.tagIds.map((tag_id) => {
            return {
              product_id: product.id,
              price: price, 
              stock: stock
            };
          });
          return ProductTag.bulkCreate(productTagIdArr);
        }
        // if no product tags, just respond
        res.status(200).json(product);
      })
      .then((productTagIds) => res.status(200).json(productTagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });

router.route('/:id')
  .get(async (req, res) => {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [{ model: Category }, { model: Tag }],
      });

      if (!product) {
        res.status(404).json({ message: 'No product found with that id!' });
        return;
      }

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .put(async (req, res) => {
    // update product data
    Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then(async () => {
        if (req.body.tagIds && req.body.tagIds.length) {
          const productTags = await ProductTag.findAll({
            where: { product_id: req.params.id }
          });

          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);

          // run both actions
          await Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        }

        res.json({ message: 'Product updated successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });

module.exports = router;