import { useAuth } from "../context/auth.context";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { signUp, googleAuth } = useAuth();

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
    <main className="page-shell min-h-[85vh] flex items-center justify-center">
      <section className="surface-card max-w-md w-full mx-auto space-y-8 animate-reveal">
        {/* Header Section */}
        <header className="space-y-3 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-2">
            <p className="eyebrow-label !text-cyan-400 !mb-0">New Identity</p>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Join Leptomania</h1>
          <p className="text-muted text-sm px-4">
            Create an account to access our curated hardware drops and priority logistics.
          </p>
        </header>

        {/* Social Grid - Staggered entrance */}
        <div className="grid grid-cols-2 gap-3 animate-reveal stagger-1">
          <button
            type="button"
            className="button-minimal !bg-white/5 border-white/5 hover:!bg-white/10 flex items-center justify-center gap-2 py-3"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-[10px] uppercase tracking-widest font-bold">GitHub</span>
          </button>

          <button
            onClick={googleAuth}
            type="button"
            className="button-minimal !bg-white/5 border-white/5 hover:!bg-white/10 flex items-center justify-center gap-2 py-3"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            <span className="text-[10px] uppercase tracking-widest font-bold">Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center py-2 animate-reveal stagger-2">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-4 text-[10px] uppercase tracking-[0.3em] text-white/30">Registry</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5 animate-reveal stagger-3">
          <div className="space-y-2">
            <label className="eyebrow-label ml-1">Legal Name</label>
            <input
              type="text"
              value={formData.fullname}
              onChange={handleChange}
              name="fullname"
              placeholder="Alex Maxwell"
              required
              className="input-minimal !bg-white/[0.02] focus:!bg-white/[0.05]"
            />
          </div>

          <div className="space-y-2">
            <label className="eyebrow-label ml-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder="you@studio.com"
              required
              className="input-minimal !bg-white/[0.02] focus:!bg-white/[0.05]"
            />
          </div>

          <div className="space-y-2">
            <label className="eyebrow-label ml-1">Passphrase</label>
            <input
              type="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              placeholder="••••••••"
              required
              className="input-minimal !bg-white/[0.02] focus:!bg-white/[0.05]"
            />
            <p className="text-[10px] text-white/30 ml-1">Minimum 8 characters with high entropy.</p>
          </div>

          <button
            type="submit"
            className="button-minimal w-full !bg-white !text-black !py-4 font-bold hover:!bg-cyan-400 transition-colors shadow-xl"
          >
            Establish Account
          </button>
        </form>

        <footer className="text-center pt-4 animate-reveal stagger-4">
          <p className="text-xs text-white/40 tracking-wide">
            Already a member?{" "}
            <Link to="/login" className="text-white hover:text-cyan-400 font-semibold underline underline-offset-4 transition-all">
              Authenticate
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
};

export default SignUp;
