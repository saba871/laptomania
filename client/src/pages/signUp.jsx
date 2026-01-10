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

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            className="button-minimal w-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-3 text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>

          <button
            type="button"
            className="button-minimal w-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-3 text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface-card px-2 text-muted">Or continue with email</span>
          </div>
        </div>

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
