import ProductList from "./Components/ProductList";
import CartSidebar from "./Components/CartSidebar";

function App() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Billing Application</h1>
      <ProductList />
      <CartSidebar />
    </div>
  );
}

export default App;
