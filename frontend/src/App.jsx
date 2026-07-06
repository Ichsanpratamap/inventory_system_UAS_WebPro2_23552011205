import {
Routes,
Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ScanPage from "./pages/ScanPage";
import ItemDetailPage from "./pages/ItemDetailPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
return ( <Routes>
<Route
path="/"
element={<LoginPage />}
/>

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/scan"
    element={
      <ProtectedRoute>
        <ScanPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/item/:id"
    element={
      <ProtectedRoute>
        <ItemDetailPage />
      </ProtectedRoute>
    }
  />
</Routes>

);
}

export default App;
