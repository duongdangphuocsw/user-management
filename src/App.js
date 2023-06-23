import logo from "./logo.svg";
import "./App.css";
import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import User from "./routes/User/User.js";
import Customer from "./routes/Customer/Customer";
import Dashboard from "./routes/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Counter from "./components/Counter/Counter";

function Heading(props) {
  return <h1>{props.router_name}</h1>;
}

function App(props) {
  return (
    <HashRouter>
      <div className="App">
        <Navigation />
        <div className="router-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
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
    </HashRouter>
  );
}

export { Heading };
export default App;
