import { Link } from "react-router-dom";
import { useLeptop } from "../context/leptops.context";

const Home = () => {
    const { leptops } = useLeptop();
    const featured = leptops?.slice(0, 3) || [];

    return (
        <main className="page-shell space-y-24">
            {/* HERO SECTION */}
            <section
                className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-950/40 px-8 py-20 text-white animate-reveal"
            >
                {/* Dynamic Background Glows */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden>
                    <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
                    <div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]" />
                </div>

                <div className="relative z-10 grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-center">
                    <div className="space-y-8 animate-reveal stagger-1">
                        <span className="eyebrow-label bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            The 2026 Collection
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                            Minimal gear. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Maximal focus.
                            </span>
                        </h1>
                        <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
                            Leptomania is a curated catalog of high-performance hardware
                            designed for the modern creative. No noise, just precision.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link to="/laptops" className="button-minimal !bg-white !text-black !px-8 !py-4">
                                Browse Collection
                            </Link>
                            <Link to="/signup" className="button-minimal !bg-transparent border-white/20 hover:border-white !px-8 !py-4">
                                Join the Elite
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid - Using the modern metric style */}
                    <div className="grid grid-cols-2 gap-4 animate-reveal stagger-2">
                        {[
                            { label: "Avg. Price", value: "$2.6k" },
                            { label: "Global Ops", value: "24/7" },
                            { label: "Ship Time", value: "48h" },
                            { label: "Rating", value: "4.9" },
                        ].map((metric, i) => (
                            <div key={metric.label} className="hero-metric group hover:border-cyan-500/50 transition-all duration-500">
                                <strong className="text-3xl font-bold group-hover:text-cyan-400">{metric.value}</strong>
                                <span className="text-[0.6rem] tracking-[0.2em]">{metric.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="grid gap-6 md:grid-cols-3">
                {[
                    { label: "Curated", headline: "Pure Performance", icon: "⚲" },
                    { label: "Logistics", headline: "Global Velocity", icon: "↗" },
                    { label: "Security", headline: "Encrypted Auth", icon: "☍" },
                ].map((feature, i) => (
                    <article key={feature.label}
                             className={`feature-card animate-reveal stagger-${i+1} hover:bg-white/5 transition-colors`}>
                        <div className="feature-icon">{feature.icon}</div>
                        <p className="eyebrow-label mb-2 text-cyan-400/80">{feature.label}</p>
                        <h3 className="text-xl font-semibold">{feature.headline}</h3>
                    </article>
                ))}
            </section>

            {/* DROPS SECTION */}
            <section className="space-y-10">
                <div className="flex flex-wrap items-end justify-between gap-6 px-2">
                    <div className="animate-reveal stagger-1">
                        <p className="eyebrow-label">Latest Arrivals</p>
                        <h2 className="text-4xl font-bold">Featured Drops</h2>
                    </div>
                    <Link to="/laptops" className="text-sm tracking-widest uppercase border-b border-white/10 pb-1 hover:border-cyan-400 transition-colors">
                        View Full Catalog →
                    </Link>
                </div>

                {featured.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-3">
                        {featured.map((laptop, i) => (
                            <article
                                key={laptop._id}
                                className={`surface-card group animate-reveal stagger-${i+1}`}
                            >
                                <div className="media-frame mb-6 aspect-video overflow-hidden rounded-2xl">
                                    <img
                                        src={laptop.image?.[0]}
                                        alt={laptop.model}
                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold">{laptop.brand}</h3>
                                            <p className="text-muted text-sm">{laptop.model}</p>
                                        </div>
                                        <span className="text-cyan-400 font-mono">${laptop.price}</span>
                                    </div>
                                    <div className="pt-4 border-t border-white/5 flex gap-2">
                                        <span className="text-[0.6rem] px-2 py-1 bg-white/5 rounded uppercase tracking-tighter">16GB RAM</span>
                                        <span className="text-[0.6rem] px-2 py-1 bg-white/5 rounded uppercase tracking-tighter">SSD Gen4</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-[2rem]">
                        <p className="text-muted italic">Awaiting the next hardware drop...</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Home;
