import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function LoginPage() {
const navigate = useNavigate();

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const handleLogin = async (e) => {
e.preventDefault();

try {
  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  localStorage.setItem(
    "token",
    response.data.token
  );

  navigate("/dashboard");
} catch (error) {
  alert("Login failed");
}

};

return ( <div className="min-h-screen flex items-center justify-center bg-gray-100"> <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"> <h1 className="text-3xl font-bold text-center mb-6">
Inventory Login </h1>

    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 rounded-lg mb-4"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded-lg mb-4"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-lg"
      >
        Login
      </button>
    </form>
  </div>
</div>

);
}

export default LoginPage;
