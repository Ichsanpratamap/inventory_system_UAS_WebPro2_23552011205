import {
useEffect,
useState,
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

function DashboardPage() {
const navigate = useNavigate();

const [items, setItems] = useState([]);

const [search, setSearch] =
useState("");

const [editingId, setEditingId] = useState(null);

const [formData, setFormData] =
useState({
code: "",
name: "",
category: "",
condition: "",
location: "",
quantity: "",
});

const token =
localStorage.getItem("token");

const getItems = async () => {
try {
const response = await api.get(
"/items",
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

  setItems(response.data);
} catch (error) {
  console.log(error);
}

};

useEffect(() => {
getItems();
}, []);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
      await api.put(
        `/items/${editingId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Item updated");
    } else {
      await api.post(
        "/items",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Item added");
    }

    setEditingId(null);

    setFormData({
      code: "",
      name: "",
      category: "",
      condition: "",
      location: "",
      quantity: "",
    });

    getItems();
  } catch (error) {
    console.log(error);
  }
};

const handleLogout = () => {
localStorage.removeItem("token");

navigate("/");

};

const filteredItems = items.filter(
(item) =>
item.name
.toLowerCase()
.includes(search.toLowerCase()) ||
item.code
.toLowerCase()
.includes(search.toLowerCase())
);

const deleteItem = async (id) => {
  const confirmDelete = window.confirm(
    "Yakin ingin menghapus barang ini?"
  );

  
  if (!confirmDelete) return;

  try {
    await api.delete(`/items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Item berhasil dihapus");

    getItems();
  } catch (error) {
    console.log(error);
    alert("Gagal menghapus item");
  }
};

const editItem = (item) => {
   console.log("Edit item:", item);
  setEditingId(item.id);

  setFormData({
    code: item.code,
    name: item.name,
    category: item.category,
    condition: item.condition,
    location: item.location,
    quantity: item.quantity,
  });
};
return ( <div className="p-8 bg-gray-100 min-h-screen"> <div className="flex justify-between items-center mb-6"> <h1 className="text-3xl font-bold">
Lab Inventory Dashboard </h1>

    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  </div>

  <div className="grid grid-cols-3 gap-6 mb-6">
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold">
        Total Items
      </h2>

      <p className="text-3xl mt-2">
        {items.length}
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold">
        Available
      </h2>

      <p className="text-3xl mt-2">
        {
          items.filter(
            (item) =>
              item.status ===
              "available"
          ).length
        }
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold">
        Borrowed
      </h2>

      <p className="text-3xl mt-2">
        {
          items.filter(
            (item) =>
              item.status ===
              "borrowed"
          ).length
        }
      </p>
    </div>
  </div>

  <div className="mb-6">
    <input
      type="text"
      placeholder="Search item..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full border p-3 rounded-lg"
    />
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md mb-8">
    <h2 className="text-2xl font-semibold mb-4">
  {editingId ? "Update Item" : "Add Item"}
</h2>

    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4"
    >
      <input
        type="text"
        name="code"
        placeholder="Code"
        value={formData.code}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        type="text"
        name="condition"
        placeholder="Condition"
        value={formData.condition}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <button
  type="submit"
  className="col-span-2 bg-blue-600 text-white p-3 rounded-lg"
>
  {editingId ? "Update Item" : "Add Item"}
</button>
    </form>
  </div>

  <div className="grid grid-cols-3 gap-6">
    {filteredItems.map((item) => (
      <div
        key={item.id}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-xl font-bold mb-2">
          {item.name}
        </h3>

        <p>
          <strong>Kode:</strong>{" "}
          {item.code}
        </p>

        <p>
          <strong>Kategori:</strong>{" "}
          {item.category}
        </p>

        <p>
          <strong>Kondisi:</strong>{" "}
          {item.condition}
        </p>

        <p>
          <strong>Lokasi:</strong>{" "}
          {item.location}
        </p>

        <p>
          <strong>Jumlah:</strong>{" "}
          {item.quantity}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {item.status}
        </p>

        {item.qr_code && (
          <img
            src={item.qr_code}
            alt="QR"
            className="mt-4 w-40"
          />
        )}

        <div className="flex gap-2 mt-4">

  <button
    onClick={() => navigate(`/item/${item.id}`)}
    className="bg-blue-500 text-white px-3 py-2 rounded-lg flex-1"
  >
    Detail
  </button>

  <button
    onClick={() => editItem(item)}
    className="bg-yellow-500 text-white px-3 py-2 rounded-lg flex-1"
  >
    Update
  </button>

  <button
    onClick={() => deleteItem(item.id)}
    className="bg-red-500 text-white px-3 py-2 rounded-lg flex-1"
  >
    Delete
  </button>

</div>
      </div>
    ))}
  </div>
</div>

);
}

export default DashboardPage;
