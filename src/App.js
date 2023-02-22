import logo from "./logo.svg";
import "./App.css";
import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import User from "./routes/User/User.js";
import Customer from "./routes/Customer/Customer";
import Product from "./routes/Product/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Heading(props) {
  return <h1>{props.router_name}</h1>;
}
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <div className="router-content">
          <Routes>
            <Route path="/product" element={<Product />} />
            <Route path="/customer" element={<Customer />} />
            <Route exact path="/user" element={<User />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover  
          theme="light"
        />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}
export { Heading };
export default App;
