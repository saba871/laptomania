import { useAuth } from "../context/auth.context";
import { useLeptop } from "../context/leptops.context";

const AddLaptop = () => {
  const { addLaptop } = useLeptop();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addLaptop(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 animate-reveal">
      {/* SECTION: IDENTITY */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10"></span>
          <p className="eyebrow-label !mb-0 text-cyan-400">01 Identity</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40 ml-1">Brand</label>
            <input className="input-minimal focus:border-cyan-500/50" type="text" name="brand" placeholder="e.g. Apple" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40 ml-1">Model</label>
            <input className="input-minimal" type="text" name="model" placeholder="e.g. MacBook Pro" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40 ml-1">Series</label>
            <input className="input-minimal" type="text" name="series" placeholder="M3 Max Edition" />
          </div>
        </div>
      </div>

      {/* SECTION: PERFORMANCE */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10"></span>
          <p className="eyebrow-label !mb-0 text-cyan-400">02 Performance</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <input className="input-minimal" type="text" name="proccesor" placeholder="CPU" required />
          <input className="input-minimal" type="text" name="graphics" placeholder="GPU" />
          <input className="input-minimal" type="text" name="ram" placeholder="RAM (GB)" required />
          <input className="input-minimal" type="text" name="storage" placeholder="Storage" required />
        </div>
      </div>

      {/* SECTION: ASSETS & DESCRIPTION */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10"></span>
          <p className="eyebrow-label !mb-0 text-cyan-400">03 Presentation</p>
        </div>
        <textarea className="input-minimal !bg-white/[0.02]" rows={4} name="description" placeholder="Describe the machine's soul..." />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40 ml-1">Price (USD)</label>
            <input className="input-minimal" type="number" name="price" placeholder="2999" required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40 ml-1">Visual Assets</label>
            <input type="file" name="images" multiple className="file:button-minimal file:!bg-white/10 file:!py-1 file:mr-4 file:border-none text-xs text-white/40" />
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          Drafting Mode Active
        </div>
        <button
          type="submit"
          className="button-minimal !bg-cyan-500 !text-black w-full sm:w-auto px-12 !py-4 font-bold"
        >
          Push to Catalog
        </button>
      </div>
    </form>
  );
};

const Panel = () => {
  const { user } = useAuth();
  const isManager = user?.role === "admin" || user?.role === "moderator";

  return (
    <main className="page-shell space-y-12">
      {/* HEADER STATS */}
      <header className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 surface-card !bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="eyebrow-label text-cyan-400">Operator Profile</p>
              <h1 className="text-4xl font-bold tracking-tight">{user?.fullname}</h1>
              <p className="text-white/40 font-mono text-sm mt-1">{user?.email}</p>
            </div>
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest">
              {user?.role}
            </div>
          </div>
        </div>

        <div className="surface-card flex flex-col justify-center text-center border-white/5">
          <p className="eyebrow-label">System Status</p>
          <div className="text-2xl font-bold text-emerald-400 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            Active
          </div>
          <p className="text-[10px] text-white/20 uppercase mt-2 tracking-tighter">Verified Session</p>
        </div>
      </header>

      {/* CONTENT AREA */}
      <section className="grid gap-8">
        {isManager ? (
          <div className="surface-card !p-0 overflow-hidden border-white/5">
            <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
              <h2 className="text-xl font-semibold">Inventory Registry</h2>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full uppercase tracking-widest">Editor View</span>
            </div>
            <div className="p-8">
              <AddLaptop />
            </div>
          </div>
        ) : (
          <div className="surface-card border-dashed border-white/20 bg-transparent py-20 text-center">
            <h2 className="text-xl font-medium text-white/60">Standard Clearance</h2>
            <p className="text-sm text-white/30 max-w-sm mx-auto mt-2">
              Your account does not have "Editor" permissions. Browse the catalog to view your saved items.
            </p>
            <button className="button-minimal mt-8 !border-white/10">Request Promotion</button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Panel;
