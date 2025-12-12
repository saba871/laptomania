import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useLeptop } from "../context/leptops.context";
import { useState } from "react";

const Nav = () => {
  const { user, logOut } = useAuth();
  const { cart, addToCart, romveFromCart, removeAll } = useLeptop();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative sticky top-0 z-50 border-b border-white/10 bg-[rgba(3,7,18,0.85)] backdrop-blur-2xl">
      <nav className="max-w-6xl mx-auto flex flex-wrap items-center justify-between px-6 py-5 gap-4">
        <Link
          to="/"
          className="text-lg md:text-xl font-semibold uppercase tracking-[0.6em] text-white hover:text-teal-100 transition"
        >
          Leptomania
        </Link>

        <ul className="flex flex-wrap items-center gap-6 text-[0.7rem] tracking-[0.3em] uppercase text-white/60">
          <li>
            <Link to="/" className="hover:text-white transition">Home</Link>
          </li>
          <li>
            <Link to="/laptops" className="hover:text-white transition">Laptops</Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="button-minimal text-xs uppercase tracking-[0.3em] text-white/80 hover:text-white relative"
              >
                Cart
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-[0.65rem] bg-white text-gray-900 font-bold px-1.5 py-0.5 rounded-full">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
              <Link
                to="/panel"
                className="button-minimal text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white"
              >
                Panel
              </Link>
              <button
                onClick={logOut}
                className="button-minimal text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="button-minimal text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="button-minimal text-xs uppercase tracking-[0.3em] text-white hover:text-gray-900 bg-white/10 hover:bg-white"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>

      {isOpen && (
        <div className="absolute right-4 top-[calc(100%+1rem)] w-[min(420px,90vw)] surface-card border border-white/10 animate-slideDown">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">In your cart</p>
              <h2 className="text-2xl font-semibold">{cart.length} items</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="button-minimal text-[0.65rem] uppercase tracking-[0.3em] text-white/60 hover:text-white"
            >
              Close
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-muted text-sm">Your cart is waiting for something cool.</p>
          ) : (
            <div className="flex flex-col space-y-4 max-h-[320px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition"
                >
                  <img
                    src={item.image?.[0]}
                    alt={`${item.brand} ${item.model}`}
                    className="w-20 h-20 rounded-xl object-cover border border-white/10"
                  />

                  <div className="flex-1 flex flex-col gap-2">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight">
                        {item.brand} {item.model}
                      </h3>
                      <p className="text-sm text-muted capitalize">{item.processor || item.proccesor}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-white/80">
                      Qty
                      <button
                        onClick={() => romveFromCart(item)}
                        className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20"
                      >
                        -
                      </button>
                      <span className="text-base font-semibold min-w-[1.5rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex flex-col text-sm text-white/90">
                      <span>Unit: ${item.price}</span>
                      <span className="text-muted">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={removeAll}
                className="button-minimal w-full justify-center text-[0.7rem] uppercase tracking-[0.35em] text-white/70 hover:text-white"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Nav;
