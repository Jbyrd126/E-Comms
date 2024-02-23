const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(200).json({ message: "No tags found" });
      return;
    }

    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res
        .status(404)
        .json({ message: "Tag not found" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // sends message if user requests to update ID that does not exist
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagById) {
      res.status(200).json({ message: "No categories found" });
      return;
    }

    res.status(200).json(tagCategory);
    console.log("Category updated!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async(req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    
    if (!deleteCategory) {
      res.status(200).json({ message: "No tag found" });
      return;
    }

    res.json(deleteCategory);
    console.log("Category deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
