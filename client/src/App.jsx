import Register from "./Components/Register";
import Login from "./Components/Login";
import Product from "./Components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invoice from "./Components/Invoice";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
