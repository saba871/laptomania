import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useLeptop } from "../context/leptops.context";
import { useState, useEffect } from "react";

const Nav = () => {
  const { user, logOut } = useAuth();
  const { cart, addToCart, romveFromCart, removeAll } = useLeptop();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // მობილური მენიუს სტეიტი

  // Lock scroll when cart or mobile menu is open
  useEffect(() => {
    document.body.style.overflow = (isOpen || isMobileMenuOpen) ? "hidden" : "unset";
  }, [isOpen, isMobileMenuOpen]);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-[100] border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-[0.4em] uppercase text-white group z-[120]">
            Lepto<span className="text-cyan-400 group-hover:text-white transition-colors">mania</span>
          </Link>

          {/* Center Navigation (Desktop) */}
          <ul className="hidden md:flex items-center gap-8 text-[0.65rem] tracking-[0.25em] uppercase font-medium">
            <li><Link to="/" className="text-white/60 hover:text-cyan-400 transition-colors">Home</Link></li>
            <li><Link to="/laptops" className="text-white/60 hover:text-cyan-400 transition-colors">Laptops</Link></li>
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-3 z-[120]">
            {user ? (
              <>
                <button
                  onClick={() => {setIsOpen(true); setIsMobileMenuOpen(false)}}
                  className="button-minimal !py-2 !px-5 relative overflow-visible"
                >
                  <span className="text-[0.65rem] tracking-widest uppercase">Cart</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-black ring-4 ring-[#020617]">
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </button>
                <Link to="/panel" className="hidden md:block text-[0.65rem] tracking-widest uppercase text-white/50 hover:text-white transition">Panel</Link>
                <button onClick={logOut} className="hidden md:block text-[0.65rem] tracking-widest uppercase text-rose-400/70 hover:text-rose-400 transition">Exit</button>
              </>
            ) : (
              <div className="hidden md:flex gap-4">
                <Link to="/login" className="text-[0.65rem] tracking-widest uppercase text-white/60 pt-2">Login</Link>
                <Link to="/signup" className="button-minimal !bg-white !text-black !py-2">Join</Link>
              </div>
            )}

            {/* Hamburger Toggle Button (Mobile Only) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#020617] transition-all duration-500 md:hidden z-[110] ${
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}>
          <div className="flex flex-col items-center justify-center h-full gap-10">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl tracking-[0.3em] uppercase text-white font-light">Home</Link>
            <Link to="/laptops" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl tracking-[0.3em] uppercase text-white font-light">Laptops</Link>
            
            <div className="h-[1px] w-12 bg-white/10" />

            {user ? (
              <div className="flex flex-col items-center gap-8">
                <Link to="/panel" onClick={() => setIsMobileMenuOpen(false)} className="text-sm tracking-[0.2em] uppercase text-cyan-400">Admin Panel</Link>
                <button onClick={() => {logOut(); setIsMobileMenuOpen(false)}} className="text-sm tracking-[0.2em] uppercase text-rose-500">Sign Out</button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm tracking-[0.2em] uppercase text-white/60">Login</Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="button-minimal !bg-white !text-black !px-12 !py-4">Join Now</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modern Cart Overlay - Unchanged but ensure it has high z-index */}
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md h-full bg-[#090f1c] border-l border-white/10 p-8 shadow-2xl flex flex-col animate-reveal">
            {/* ... (დანარჩენი Cart-ის კოდი იგივე რჩება) ... */}
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="eyebrow-label text-cyan-400">Your Selection</span>
                <h2 className="text-3xl font-bold tracking-tight text-white">Shopping Cart</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white mb-1 text-sm uppercase tracking-tighter">✕ Close</button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
               {cart.length === 0 ? (
                 <p className="text-white/30 italic text-center py-20">Cart is empty</p>
               ) : (
                 cart.map((item) => (
                   <div key={item._id} className="flex gap-4">
                      <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden">
                        <img src={item.image?.[0]} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white text-sm">{item.brand}</h4>
                        <p className="text-cyan-400 text-xs">${item.price}</p>
                      </div>
                   </div>
                 ))
               )}
            </div>
            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="mt-auto pt-4 border-t border-white/10">
                <div className="flex justify-between text-white mb-4">
                  <span className="text-xs uppercase">Total</span>
                  <span className="font-bold">${totalAmount.toFixed(2)}</span>
                </div>
                <button className="w-full bg-cyan-500 py-3 rounded-lg text-black font-bold uppercase text-[10px] tracking-widest">Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
