const pool = require("../config/db");

const QRCode = require("qrcode");

const createItem = async (req, res) => {
try {
const {
code,
name,
category,
condition,
location,
quantity,
} = req.body;

const newItem = await pool.query(
  `INSERT INTO items
  (code, name, category, condition, location, quantity)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`,
  [
    code,
    name,
    category,
    condition,
    location,
    quantity,
  ]
);

const qrCode =
  await QRCode.toDataURL(
    `http://localhost:5173/item/${newItem.rows[0].id}`
  );

const updatedItem =
  await pool.query(
    `UPDATE items
     SET qr_code = $1
     WHERE id = $2
     RETURNING *`,
    [
      qrCode,
      newItem.rows[0].id,
    ]
  );

res.status(201).json({
  message: "Item created",
  item: updatedItem.rows[0],
});

} catch (error) {
console.log(error);

res.status(500).json({
  message: "Server error",
});

}
};

const getItems = async (req, res) => {
try {
const items = await pool.query(
"SELECT * FROM items ORDER BY id DESC"
);

res.status(200).json(items.rows);

} catch (error) {
console.log(error);

res.status(500).json({
  message: "Server error",
});

}
};

const getItemById = async (
req,
res
) => {
try {
const { id } = req.params;

const item = await pool.query(
  "SELECT * FROM items WHERE id = $1",
  [id]
);

if (
  item.rows.length === 0
) {
  return res.status(404).json({
    message: "Item not found",
  });
}

res.status(200).json(
  item.rows[0]
);

} catch (error) {
console.log(error);

res.status(500).json({
  message: "Server error",
});

}
};

const updateItem = async (req, res) => {
try {
const { id } = req.params;

const {
  code,
  name,
  category,
  condition,
  location,
  quantity,
} = req.body;

const updatedItem =
  await pool.query(
    `UPDATE items
     SET code=$1,
         name=$2,
         category=$3,
         condition=$4,
         location=$5,
         quantity=$6
     WHERE id=$7
     RETURNING *`,
    [
      code,
      name,
      category,
      condition,
      location,
      quantity,
      id,
    ]
  );

res.status(200).json({
  message: "Item updated",
  item: updatedItem.rows[0],
});

} catch (error) {
console.log(error);

res.status(500).json({
  message: "Server error",
});

}
};

const deleteItem = async (req, res) => {
try {
const { id } = req.params;

await pool.query(
  "DELETE FROM items WHERE id = $1",
  [id]
);

res.status(200).json({
  message: "Item deleted",
});

} catch (error) {
console.log(error);

res.status(500).json({
  message: "Server error",
});

}
};

module.exports = {
createItem,
getItems,
getItemById,
updateItem,
deleteItem,
};
