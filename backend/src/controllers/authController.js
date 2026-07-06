const pool = require("../config/db");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
try {
const { name, email, password } = req.body;

const userExists = await pool.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
);

if (userExists.rows.length > 0) {
  return res.status(400).json({
    message: "Email already exists",
  });
}

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const newUser = await pool.query(
  "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
  [name, email, hashedPassword]
);

res.status(201).json({
  message: "Register success",
  user: newUser.rows[0],
});

} catch (error) {
console.log(error);

```
res.status(500).json({
  message: "Server error",
});
```

}
};


const jwt = require("jsonwebtoken");

const login = async (req, res) => {
try {
const { email, password } = req.body;


// cek user
const user = await pool.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
);

if (user.rows.length === 0) {
  return res.status(400).json({
    message: "Email not found",
  });
}

// cek password
const validPassword = await bcrypt.compare(
  password,
  user.rows[0].password
);

if (!validPassword) {
  return res.status(400).json({
    message: "Wrong password",
  });
}

// generate token
const token = jwt.sign(
  {
    id: user.rows[0].id,
    email: user.rows[0].email,
    role: user.rows[0].role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d",
  }
);

res.status(200).json({
  message: "Login success",
  token,
  user: {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  },
});

} catch (error) {
console.log(error);

res.status(500).json({
  message: "Server error",
});

}
};

module.exports = {
register,
login,
};
