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
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="Email"
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            placeholder="Password"
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
};

export default LogIn;
