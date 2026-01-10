import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { useLeptop } from "../context/leptops.context";

const Laptop = ({ laptop }) => {
    const { deleteLeptop, updateLaptop, addToCart } = useLeptop();
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);

    // მედიის ლოგიკა იგივეა, რათა შეინარჩუნოს თავსებადობა
    const media = (() => {
        if (Array.isArray(laptop.image)) return laptop.image;
        if (Array.isArray(laptop.images)) return laptop.images;
        if (typeof laptop.image === "string" && laptop.image)
            return [laptop.image];
        if (typeof laptop.images === "string" && laptop.images)
            return [laptop.images];
        return [];
    })();

    const mainImage = media[0];

    const editableFields = Object.keys(laptop).filter(
        (key) =>
            !["_id", "__v", "createdAt", "updatedAt", "isAvailable"].includes(
                key
            )
    );

    const formatLabel = (label) =>
        label
            .replace(/_/g, " ")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/^./, (char) => char.toUpperCase());

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await updateLaptop(laptop._id, formData);
        setEditing(false);
    };

    if (editing) {
        // რედაქტირების ფორმა არ შეგვიცვლია, რადგან მთავარი პრობლემა დიზაინია
        return (
            <article className="surface-card rounded-3xl border border-white/5 shadow-xl shadow-black/5 p-6">
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">
                        Editing: {laptop.brand} {laptop.model}
                    </h3>
                    {editableFields.map((key) => (
                        <div key={key} className="flex flex-col gap-1">
                            <label className="eyebrow-label">
                                {formatLabel(key)}
                            </label>
                            {key === "image" || key === "images" ? (
                                <input
                                    type="file"
                                    name="images"
                                    multiple
                                    className="input-minimal"
                                />
                            ) : (
                                <input
                                    type="text"
                                    name={key}
                                    defaultValue={laptop[key] || ""}
                                    className="input-minimal"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                            type="submit"
                            className="button-minimal flex-1 bg-white/10 text-xs uppercase tracking-[0.3em] hover:bg-white/20"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                            className="button-minimal flex-1 text-xs uppercase tracking-[0.3em]"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </article>
        );
    }

    // ნორმალური ჩვენების (არარედაქტირების) რეჟიმი
    return (
        <article className="surface-card flex flex-col sm:flex-row rounded-3xl border border-white/5 shadow-xl shadow-black/5 transition duration-300 hover:-translate-y-1 hover:border-white/10 overflow-hidden">
            {/* ფოტოს განყოფილება - უფრო დიდი და გამოკვეთილი */}
            <div className="sm:w-2/5 min-h-[250px] overflow-hidden from-slate-900 via-slate-800 to-slate-900 relative">
                <figure>
                    {mainImage ? (
                        <img
                            src={mainImage}
                            alt={`${laptop.brand} ${laptop.model}`}
                            className="h-full w-full object-cover object-center transition duration-500 hover:scale-105 min-h-[250px]"
                        />
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-center text-sm text-muted p-4 min-h-[250px]">
                            <span className="text-lg font-semibold">
                                {laptop.brand || "Unknown"}
                            </span>
                            <span>No photo provided</span>
                        </div>
                    )}
                </figure>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                        Drop price
                    </p>
                    <p className="text-2xl font-semibold text-white">
                        ${laptop.price || 0}
                    </p>
                </div>
            </div>

            {/* ინფორმაციის და მოქმედებების განყოფილება */}
            <div className="flex flex-1 flex-col justify-between gap-4 p-6 sm:w-3/5">
                {/* სათაური და აღწერა */}
                <div>
                    <h2 className="text-2xl font-semibold leading-tight mb-1">
                        {laptop.brand} {laptop.model}
                    </h2>
                    <p className="eyebrow-label mb-3 text-muted">
                        {laptop.series || laptop.category || "Laptop"}
                    </p>

                    {/* ძირითადი მახასიათებლები - უფრო სუფთა ცხრილის ფორმატი */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <span className="text-white">
                            Processor:{" "}
                            <span className="text-muted">
                                {laptop.processor || laptop.proccesor || "N/A"}
                            </span>
                        </span>
                        <span className="text-white">
                            RAM:{" "}
                            <span className="text-muted">
                                {laptop.ram || "N/A"}
                            </span>
                        </span>
                        <span className="text-white">
                            Storage:{" "}
                            <span className="text-muted">
                                {laptop.storage || "N/A"}
                            </span>
                        </span>
                        <span className="text-white">
                            OS:{" "}
                            <span className="text-muted">
                                {laptop.os || "N/A"}
                            </span>
                        </span>
                    </div>
                </div>

                {/* აღწერა - უფრო კომპაქტური */}
                <p className="text-sm leading-relaxed text-muted mt-3 line-clamp-2">
                    {laptop.description ||
                        "No description has been added for this laptop yet."}
                </p>

                {/* მოქმედებები და მარაგი */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                    <span className="text-xs uppercase tracking-[0.35em] text-muted">
                        Stock:{" "}
                        <strong className="tracking-normal text-white">
                            {laptop.stock || 0}
                        </strong>{" "}
                        | Condition: {laptop.condition || "Available"}
                    </span>

                    {user?.role === "admin" ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => deleteLeptop(laptop._id)}
                                className="button-minimal px-3 py-1 border border-red-400/40 bg-red-500/10 text-xs uppercase tracking-[0.2em] text-red-200 hover:bg-red-500/20"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setEditing(true)}
                                className="button-minimal px-3 py-1 border border-white/20 bg-white/10 text-xs uppercase tracking-[0.2em] hover:bg-white/20"
                            >
                                Update
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(laptop)}
                            className="button-minimal px-4 py-2 border border-emerald-400/50 bg-emerald-500/10 text-xs uppercase tracking-[0.35em] text-emerald-100 hover:bg-emerald-500/20"
                        >
                            Add to cart
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
};

// დანარჩენი კომპონენტები (LaptopList, Catalog) იგივე რჩება.
const LaptopList = ({ limit } = {}) => {
    const { leptops } = useLeptop();

    if (!leptops || leptops.length === 0) {
        return <p className="text-muted">No laptops found.</p>;
    }

    const items = limit ? leptops.slice(0, limit) : leptops;

    // შეიცვალა grid-ის სვეტები 2-დან 1-ზე მობილურისთვის და 2-ზე დესკტოპისთვის (თუ გვინდა ჰორიზონტალური დიზაინის უკეთ წარმოჩენა)
    return (
        <section className="grid gap-6 xl:grid-cols-2">
            {items.map((laptop) => (
                <Laptop key={laptop._id} laptop={laptop} />
            ))}
        </section>
    );
};

const Catalog = () => {
    const { user } = useAuth();

    return (
        <main className="page-shell space-y-10">
            <header className="surface-card" data-variant="subtle">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div className="space-y-3">
                        <p className="eyebrow-label">Inventory</p>
                        <h1 className="text-4xl font-semibold tracking-tight">
                            Laptops
                        </h1>
                        <p className="text-muted max-w-2xl">
                            Hand-picked premium devices curated for performance
                            and endurance.
                        </p>
                    </div>
                    {user ? (
                        <span className="text-xs uppercase tracking-[0.4em] text-muted">
                            Signed in as {user.name || user.email}
                        </span>
                    ) : (
                        <span className="text-xs uppercase tracking-[0.4em] text-muted">
                            Browse only
                        </span>
                    )}
                </div>
            </header>

            <LaptopList />
        </main>
    );
};

export { LaptopList };
export default Catalog;
