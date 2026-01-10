import { Link } from "react-router-dom";
import { useLeptop } from "../context/leptops.context";

const Home = () => {
    const { leptops } = useLeptop();
    const featured = leptops?.slice(0, 3) || [];

    return (
        <main className="page-shell space-y-12">
            <section
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(2,6,23,0.75)] px-8 py-14 text-white surface-card"
                data-variant="frost"
            >
                <div className="absolute inset-0 opacity-60" aria-hidden>
                    <div className="absolute -top-32 -right-10 h-64 w-64 rounded-full from-teal-400/40 to-cyan-500/40 blur-3xl" />
                    <div className="absolute -bottom-10 left-0 h-48 w-48 rounded-full from-cyan-500/30 to-white/10 blur-3xl" />
                </div>

                <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] items-center">
                    <div className="space-y-6">
                        <p className="eyebrow-label text-white/80">
                            Curated tech pieces
                        </p>
                        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                            Minimal laptops for maximal focus.
                        </h1>
                        <p className="text-white/80 text-lg">
                            Leptomania is a tightly edited catalogue of laptops
                            ready for premium work and timeless desks. Minimal,
                            intentional, obsessive.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link
                                to="/laptops"
                                className="button-minimal bg-white text-gray-900 text-xs tracking-[0.4em] uppercase"
                            >
                                Browse drop
                            </Link>
                            <Link
                                to="/signup"
                                className="button-minimal text-xs tracking-[0.35em] uppercase text-white/80"
                            >
                                Join list
                            </Link>
                        </div>
                    </div>

                    <div className="hero-grid">
                        {[
                            { label: "Avg. price", value: "$2.6K" },
                            { label: "Time to ship", value: "48h" },
                            { label: "Client rating", value: "4.98" },
                        ].map((metric) => (
                            <div key={metric.label} className="hero-metric">
                                <strong>{metric.value}</strong>
                                <span>{metric.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="feature-grid">
                {[
                    {
                        label: "Curated",
                        headline:
                            "Only hardware we would run on our own desks.",
                        icon: "⚲",
                    },
                    {
                        label: "Fast shipping",
                        headline:
                            "Tracked logistics with real-time status updates.",
                        icon: "↗",
                    },
                    {
                        label: "Secure panel",
                        headline:
                            "Role-based panel with moderation-ready tools.",
                        icon: "☍",
                    },
                ].map((feature) => (
                    <article key={feature.label} className="feature-card">
                        <div className="feature-icon" aria-hidden>
                            {feature.icon}
                        </div>
                        <p className="eyebrow-label mb-2">{feature.label}</p>
                        <h3 className="text-lg font-semibold leading-snug">
                            {feature.headline}
                        </h3>
                    </article>
                ))}
            </section>

            <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="eyebrow-label">Featured drops</p>
                        <h2 className="text-2xl font-semibold">
                            What's trending
                        </h2>
                    </div>
                    <Link
                        to="/laptops"
                        className="button-minimal text-xs tracking-[0.35em] uppercase text-white/70"
                    >
                        View catalog
                    </Link>
                </div>

                {featured.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-3">
                        {featured.map((laptop) => (
                            <article
                                key={laptop._id}
                                className="surface-card"
                                data-variant="subtle"
                            >
                                <div className="media-frame mb-4">
                                    <img
                                        src={laptop.image?.[0]}
                                        alt={`${laptop.brand} ${laptop.model}`}
                                        className="h-40 w-full object-cover border border-white/10"
                                    />
                                </div>
                                <div className="spec-grid text-xs">
                                    <div className="spec-chip">
                                        <dt>Brand</dt>
                                        <dd>{laptop.brand}</dd>
                                    </div>
                                    <div className="spec-chip">
                                        <dt>Model</dt>
                                        <dd>{laptop.model}</dd>
                                    </div>
                                    <div className="spec-chip">
                                        <dt>Price</dt>
                                        <dd>${laptop.price ?? "Request"}</dd>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">
                        The next curated drop is loading.
                    </p>
                )}
            </section>
        </main>
    );
};

export default Home;
