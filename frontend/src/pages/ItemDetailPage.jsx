import {
useEffect,
useState,
} from "react";

import {
useParams,
} from "react-router-dom";

import api from "../services/api";

function ItemDetailPage() {
const { id } = useParams();

const [item, setItem] =
useState(null);

const token =
localStorage.getItem("token");

useEffect(() => {
getItem();
}, []);

const getItem = async () => {
try {
const response =
await api.get(
`/items/${id}`,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

  setItem(response.data);
} catch (error) {
  console.log(error);
}

};

const borrowItem = async () => {
try {
await api.post(
"/borrowings",
{
itemId: item.id,
},
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

  alert("Item borrowed");

  getItem();
} catch (error) {
  console.log(error);
}

};

if (!item) {
return ( <div className="p-8">
Loading... </div>
);
}

return ( <div className="p-8"> <div className="bg-white p-8 rounded-xl shadow-md max-w-xl"> <h1 className="text-3xl font-bold mb-6">
{item.name} </h1>

    <div className="space-y-3">
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
    </div>

    <button
      onClick={borrowItem}
      className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
    >
      Borrow Item
    </button>

    {item.qr_code && (
      <img
        src={item.qr_code}
        alt="QR"
        className="mt-6 w-48"
      />
    )}
  </div>
</div>

);
}

export default ItemDetailPage;
