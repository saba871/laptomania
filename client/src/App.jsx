import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import SignUp from "./pages/signUp";
import LogIn from "./pages/logIn";
import Panel from "./pages/Panel";
import Protect from "./context/Protect";
import Products from "./pages/Products";
import { ToastContainer, toast } from 'react-toastify';


function App() {

  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/laptops" element={<Products />} />
        <Route path="/panel" element={<Protect><Panel /></Protect>} />
      </Routes>

      <ToastContainer position="bottom-right"/>
    </>
  );
}

export default App;
