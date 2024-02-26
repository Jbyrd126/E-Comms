const router = require("express").Router();
const { Category, Product } = require("../../models");

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its id value
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categories) {
      res
        .status(404)
        .json({ message: "sorry wrong category, must have the wrong store" });
      return;
    }

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newcategory = await Category.create(req.body);
    res.status(200).json(newcategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its id value
  try {
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // sends message if user requests to update ID that does not exist
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryById) {
      res.status(200).json({ message: "No categories found" });
      return;
    }

    res.status(200).json(updateCategory);
    console.log("Category updated!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its id value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    
    if (!deleteCategory) {
      res.status(200).json({ message: "No categories found" });
      return;
    }

    res.json(deleteCategory);
    console.log("Category deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
