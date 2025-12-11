import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useLeptop } from "../context/leptops.context";
import { useState } from "react";

const Nav = () => {
  const { user, logOut } = useAuth();
  const { cart, addToCart, romveFromCart, removeAll } = useLeptop();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-lg relative">
      <nav className="container mx-auto flex justify-between items-center p-5">
        <div className="text-3xl font-bold tracking-wide">
          <Link to="/">MyStore</Link>
        </div>

        <ul className="flex space-x-8 items-center text-lg">
          <li>
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          </li>

          <li>
            <Link to="/laptops" className="hover:text-gray-300 transition">Laptops</Link>
          </li>

          {user ? (
            <>
              <li>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative hover:text-gray-300 transition font-semibold"
                >
                  Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-4 bg-red-600 text-xs px-2 py-0.5 rounded-full font-bold">
                      {
                        cart.reduce((acc, item) => acc + item.quantity, 0)
                      }
                    </span>
                  )}
                </button>
              </li>

              <li>
                <Link to="/panel" className="hover:text-gray-300 transition">Panel</Link>
              </li>

              <li>
                <button onClick={logOut} className="hover:text-gray-300 transition">LogOut</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-300 transition">LogIn</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-gray-300 transition">SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* --------- MODERN BIG CART PANEL ---------- */}
      {isOpen && (
        <div className="
          absolute right-4 top-24 w-[380px]
          bg-gray-900/95 backdrop-blur-xl
          shadow-2xl border border-gray-700
          rounded-2xl p-5 animate-slideDown
        ">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">
            Your Cart
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-400 text-lg">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="
                    flex gap-4 p-3 rounded-xl
                    bg-gray-800/60 border border-gray-700
                    hover:bg-gray-800 transition
                  "
                >
                  <img
                    src={item.image?.[0]}
                    className="w-24 h-24 rounded-xl object-cover border border-gray-600"
                  />

                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {item.brand} {item.model}
                      </h3>
                      <p className="text-gray-300 text-md flex items-center gap-2">
                        Quantity: 
                        <button onClick={() => romveFromCart(item)} className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition">-</button>
                        <span className="px-2">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition">+</button>
                    </p>
                      <p className="text-gray-300 text-md">Price: ${item.price}</p>
                      <p className="text-gray-300 text-md">Full Price: ${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => removeAll()}>Remove All</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Nav;
