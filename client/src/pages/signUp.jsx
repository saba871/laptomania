import { useAuth } from "../context/auth.context";
import { useForm } from "../hooks/useForm";

const SignUp = () => {
  const { signUp } = useAuth();

  const [formData, handleChange] = useForm({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <main className="page-shell place-content-center">
      <section className="surface-card max-w-md w-full mx-auto space-y-8">
        <header className="space-y-2">
          <p className="eyebrow-label">Create access</p>
          <h1 className="text-3xl font-semibold">Join Leptomania</h1>
          <p className="text-muted text-sm">
            Set up your account to curate and manage the perfect laptop fleet.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="eyebrow-label">Full name</label>
            <input
              type="text"
              value={formData.fullname}
              onChange={handleChange}
              name="fullname"
              placeholder="Alex Maxwell"
              required
              className="input-minimal"
            />
          </div>

          <div className="space-y-2">
            <label className="eyebrow-label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder="you@studio.com"
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
            Create account
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignUp;
