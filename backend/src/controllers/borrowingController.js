const pool = require("../config/db");

const borrowItem = async (req, res) => {
try {
const {
item_id,
borrower_name,
borrow_date,
} = req.body;

 
// cek barang
const itemCheck = await pool.query(
  "SELECT * FROM items WHERE id = $1",
  [item_id]
);

if (itemCheck.rows.length === 0) {
  return res.status(404).json({
    message: "Item not found",
  });
}

// cek status barang
if (
  itemCheck.rows[0].status ===
  "borrowed"
) {
  return res.status(400).json({
    message:
      "Item is already borrowed",
  });
}

// insert borrowing
const borrowing = await pool.query(
  `INSERT INTO borrowings
  (item_id, borrower_name, borrow_date)
  VALUES ($1, $2, $3)
  RETURNING *`,
  [
    item_id,
    borrower_name,
    borrow_date,
  ]
);

// update status barang
await pool.query(
  `UPDATE items
   SET status = 'borrowed'
   WHERE id = $1`,
  [item_id]
);

res.status(201).json({
  message: "Item borrowed",
  borrowing: borrowing.rows[0],
});
 

} catch (error) {
console.log(error);

res.status(500).json({
  message: "Server error",
});

}
};

const returnItem = async (req, res) => {
try {
const { id } = req.params;

// update borrowing
const updatedBorrowing =
  await pool.query(
    `UPDATE borrowings
     SET
     status = 'returned',
     return_date = CURRENT_DATE
     WHERE id = $1
     RETURNING *`,
    [id]
  );

const itemId =
  updatedBorrowing.rows[0].item_id;

// update item status
await pool.query(
  `UPDATE items
   SET status = 'available'
   WHERE id = $1`,
  [itemId]
);

res.status(200).json({
  message: "Item returned",
  borrowing:
    updatedBorrowing.rows[0],
});

} catch (error) {
console.log(error);

res.status(500).json({
  message: "Server error",
});

}
};

const getBorrowings = async (
req,
res
) => {
try {
const borrowings =
await pool.query(`       SELECT
        borrowings.*,
        items.name AS item_name
      FROM borrowings
      JOIN items
      ON borrowings.item_id = items.id
      ORDER BY borrowings.id DESC
    `);

res.status(200).json(
  borrowings.rows
);

} catch (error) {
console.log(error);

res.status(500).json({
  message: "Server error",
});


}
};

module.exports = {
borrowItem,
returnItem,
getBorrowings,
};