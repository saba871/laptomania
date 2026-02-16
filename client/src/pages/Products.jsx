import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { useLeptop } from "../context/leptops.context";

const Laptop = ({ laptop }) => {
    const { deleteLeptop, updateLaptop, addToCart } = useLeptop();
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);

    const media = (() => {
        const imgs = laptop.image || laptop.images || [];
        return Array.isArray(imgs) ? imgs : [imgs];
    })();

    const mainImage = media[0];

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await updateLaptop(laptop._id, formData);
        setEditing(false);
    };

    if (editing) {
        return (
            <article className="surface-card !p-8 animate-reveal">
                <form onSubmit={handleUpdate} className="space-y-6">
                    <header className="flex justify-between items-center">
                        <h3 className="text-xl font-bold tracking-tight">Modify Registry</h3>
                        <button type="button" onClick={() => setEditing(false)} className="text-xs uppercase tracking-widest text-white/40 hover:text-white">Close</button>
                    </header>
                    <div className="grid grid-cols-2 gap-4">
                        <input className="input-minimal" name="brand" defaultValue={laptop.brand} placeholder="Brand" />
                        <input className="input-minimal" name="model" defaultValue={laptop.model} placeholder="Model" />
                        <input className="input-minimal" name="price" defaultValue={laptop.price} placeholder="Price" />
                        <input className="input-minimal" name="stock" defaultValue={laptop.stock} placeholder="Stock" />
                    </div>
                    <textarea className="input-minimal" name="description" defaultValue={laptop.description} rows={3} placeholder="Description" />
                    <button type="submit" className="button-minimal w-full !bg-cyan-500 !text-black font-bold uppercase tracking-[0.2em]">Commit Changes</button>
                </form>
            </article>
        );
    }

    return (
        <article className="surface-card flex flex-col lg:flex-row p-0 overflow-hidden border-white/5 group hover:border-cyan-500/30 transition-all duration-500">
            {/* Visual Section */}
            <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden bg-gradient-to-br from-slate-900 to-black">
                {mainImage ? (
                    <img
                        src={mainImage}
                        alt={laptop.model}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10 uppercase font-black text-4xl italic">Lepto</div>
                )}

                {/* Price Tag Overlay */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                    <p className="text-cyan-400 font-mono font-bold">${laptop.price}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-3/5 p-8 flex flex-col justify-between space-y-6">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <p className="eyebrow-label !text-cyan-400/80 !mb-0">{laptop.brand}</p>
                        <span className="text-[10px] text-white/20 font-mono">ID: {laptop._id?.slice(-6)}</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-cyan-400 transition-colors">{laptop.model}</h2>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                        <div className="space-y-1">
                            <p className="text-[9px] uppercase tracking-widest text-white/30">Processor</p>
                            <p className="text-xs font-medium text-white/80 truncate">{laptop.proccesor || laptop.processor || "Generic"}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] uppercase tracking-widest text-white/30">Memory</p>
                            <p className="text-xs font-medium text-white/80">{laptop.ram || "0GB"}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] uppercase tracking-widest text-white/30">Storage</p>
                            <p className="text-xs font-medium text-white/80">{laptop.storage || "0GB"}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] uppercase tracking-widest text-white/30">Availability</p>
                            <p className={`text-xs font-medium ${laptop.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {laptop.stock > 0 ? `In Stock (${laptop.stock})` : 'Sold Out'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions Section */}
                <div className="pt-6 border-t border-white/5 flex gap-3">
                    {user?.role === "admin" ? (
                        <>
                            <button onClick={() => setEditing(true)} className="button-minimal flex-1 !py-3 border-white/10 text-[10px] uppercase font-bold tracking-widest hover:!bg-white/5 transition-all">Edit Registry</button>
                            <button onClick={() => deleteLeptop(laptop._id)} className="button-minimal !py-3 !border-rose-500/20 !text-rose-500 hover:!bg-rose-500/10 transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => addToCart(laptop)}
                            disabled={laptop.stock <= 0}
                            className="button-minimal w-full !bg-white !text-black !py-4 font-black text-[11px] uppercase tracking-[0.2em] hover:!bg-cyan-500 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                            {laptop.stock > 0 ? "Acquire Machine" : "Unavailable"}
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
};

const LaptopList = ({ limit }) => {
    const { leptops } = useLeptop();

    if (!leptops || leptops.length === 0) {
        return (
            <div className="py-20 text-center surface-card border-dashed border-white/10">
                <p className="text-white/30 uppercase tracking-widest text-xs">No hardware detected in current sector.</p>
            </div>
        );
    }

    const items = limit ? leptops.slice(0, limit) : leptops;

    return (
        <section className="grid gap-8 grid-cols-1 xl:grid-cols-2">
            {items.map((laptop, index) => (
                <div key={laptop._id} className="animate-reveal" style={{ animationDelay: `${index * 100}ms` }}>
                    <Laptop laptop={laptop} />
                </div>
            ))}
        </section>
    );
};

const Catalog = () => {
    return (
        <main className="page-shell space-y-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <p className="eyebrow-label text-cyan-400">Hardware Catalog</p>
                    <h1 className="text-5xl font-black tracking-tighter">THE FLEET</h1>
                    <p className="text-white/40 max-w-md text-sm leading-relaxed">
                        High-performance workstations engineered for the next generation of digital labor.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <p className="text-[10px] uppercase text-white/30 tracking-widest">Global Stock</p>
                        <p className="text-xl font-mono text-white/80">VERIFIED</p>
                    </div>
                </div>
            </header>

            <LaptopList />
        </main>
    );
};

export { LaptopList };
export default Catalog;
