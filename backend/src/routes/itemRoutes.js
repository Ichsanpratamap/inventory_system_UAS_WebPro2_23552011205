const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
createItem,
getItems,
getItemById,
updateItem,
deleteItem,
} = require("../controllers/itemController");

router.post(
"/",
authMiddleware,
createItem
);

router.get(
"/",
authMiddleware,
getItems
);

router.get(
"/:id",
authMiddleware,
getItemById
);

router.put(
"/:id",
authMiddleware,
updateItem
);

router.delete(
"/:id",
authMiddleware,
deleteItem
);

module.exports = router;
