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
    <form onSubmit={handleSubmit} className="space-y-10">
      <header className="space-y-3">
        <p className="eyebrow-label text-white/70">New entry</p>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">Register a new laptop</h2>
          <p className="text-muted text-sm max-w-3xl">
            Fill out the sections below from top to bottom. The structure intentionally stacks into a long
            editorial flow so every block breathes and the card gains visual depth.
          </p>
        </div>
      </header>

      <section className="space-y-8">
        <div className="space-y-3">
          <p className="eyebrow-label text-white/70">Identity</p>
          <div className="grid gap-4 md:grid-cols-3">
            <input className="input-minimal" type="text" name="brand" placeholder="Brand" required />
            <input className="input-minimal" type="text" name="model" placeholder="Model" required />
            <input className="input-minimal" type="text" name="series" placeholder="Series / family" />
          </div>
        </div>

        <div className="space-y-4">
          <p className="eyebrow-label text-white/70">Performance</p>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="input-minimal" type="text" name="proccesor" placeholder="Processor" required />
            <input className="input-minimal" type="text" name="graphics" placeholder="Graphics" />
            <input className="input-minimal" type="text" name="ram" placeholder="RAM (e.g., 16GB)" required />
            <input className="input-minimal" type="text" name="storage" placeholder="Storage" required />
          </div>
        </div>

        <div className="space-y-4">
          <p className="eyebrow-label text-white/70">Experience</p>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="input-minimal" type="text" name="display" placeholder="Display size" />
            <input className="input-minimal" type="text" name="os" placeholder="Operating system" />
            <input className="input-minimal" type="text" name="battery" placeholder="Battery / endurance" />
            <input className="input-minimal" type="text" name="ports" placeholder="Ports & connectivity" />
          </div>
        </div>

        <div className="space-y-4">
          <p className="eyebrow-label text-white/70">Commercial details</p>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="input-minimal" type="number" name="price" placeholder="Price" required />
            <input className="input-minimal" type="number" name="stock" placeholder="Stock" />
            <input className="input-minimal" type="text" name="condition" placeholder="Condition" />
            <input className="input-minimal" type="text" name="sku" placeholder="SKU / internal ID" />
          </div>
        </div>

        <div className="space-y-4">
          <p className="eyebrow-label text-white/70">Narrative</p>
          <textarea className="input-minimal" rows={6} name="description" placeholder="What makes this machine stand out?" />
          <div>
            <label className="eyebrow-label block mb-2">Images (max 4)</label>
            <input type="file" name="images" multiple className="input-minimal" />
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-white/10">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">All sections autosave until published.</p>
        <button
          type="submit"
          className="button-minimal w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white uppercase tracking-[0.35em] text-xs"
        >
          Publish laptop
        </button>
      </div>
    </form>
  );
};

const Panel = () => {
  const { user } = useAuth();
  const isManager = user?.role === "admin" || user?.role === "moderator";

  return (
    <main className="page-shell space-y-10">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <div className="surface-card space-y-6" data-variant="frost">
          <div>
            <p className="eyebrow-label">Account</p>
            <h1 className="text-3xl font-semibold">{user?.fullname}</h1>
            <p className="text-muted text-sm">{user?.email}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="stat-card">
              <p className="eyebrow-label mb-2">Role</p>
              <p className="text-2xl font-semibold capitalize">{user?.role}</p>
            </div>
            <div className="stat-card">
              <p className="eyebrow-label mb-2">Status</p>
              <p className="text-lg text-muted">Active session</p>
            </div>
          </div>
        </div>

        <div className="surface-card">
          <p className="eyebrow-label mb-3">Overview</p>
          <p className="text-sm text-muted">
            Manage your curated inventory, adjust pricing, and keep the catalog razor focused.
          </p>
          {!isManager && (
            <p className="mt-4 text-xs uppercase tracking-[0.35em] text-white/60">
              Limited access
            </p>
          )}
        </div>
      </section>

      {isManager ? (
        <section className="grid gap-6">
          <div className="surface-card" data-variant="subtle">
            <p className="eyebrow-label mb-4">Add new laptop</p>
            <AddLaptop />
          </div>
        </section>
      ) : (
        <section className="surface-card" data-variant="subtle">
          <p className="eyebrow-label mb-2">Need elevated access?</p>
          <p className="text-sm text-muted">
            Contact an admin to gain editor permissions and extend the catalog.
          </p>
        </section>
      )}
    </main>
  );
};

export default Panel;
