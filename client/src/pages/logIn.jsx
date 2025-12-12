import { useAuth } from "../context/auth.context";
import { useForm } from "../hooks/useForm";

const LogIn = () => {
  const { logIn } = useAuth();

  const [formData, handleChange] = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(formData);
  };

  return (
    <main className="page-shell place-content-center">
      <section className="surface-card max-w-md w-full mx-auto space-y-8">
        <header className="space-y-2">
          <p className="eyebrow-label">Access panel</p>
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="text-muted text-sm">
            Enter your credentials to pick up where you left off.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="eyebrow-label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder="alex@email.com"
              required
              className="input-minimal"
            />
          </div>

          <div className="space-y-2">
            <label className="eyebrow-label">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              placeholder="••••••••"
              required
              className="input-minimal"
            />
          </div>

          <button
            type="submit"
            className="button-minimal w-full bg-white/10 hover:bg-white/20 text-white/90 text-xs tracking-[0.4em] uppercase"
          >
            Log in
          </button>
        </form>
      </section>
    </main>
  );
};

export default LogIn;
