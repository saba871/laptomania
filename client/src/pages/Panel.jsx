import { useAuth } from "../context/auth.context";
import { useLeptop } from "../context/leptops.context";
import Catalog from "./Products";


const AddLaptop = () => {
    const { addLaptop } = useLeptop();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        addLaptop(formData);
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-white p-8 rounded-xl shadow-md space-y-6 max-w-lg mx-auto"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Laptop</h2>

            {/* Inputs */}
            <div className="space-y-4">
                <input className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none" type="text" name="brand" placeholder="Brand" required />

                <input className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none" type="text" name="model" placeholder="Model" required />

                <input className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none" type="text" name="proccesor" placeholder="Processor" required />

                <input className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none" type="text" name="ram" placeholder="RAM (e.g., 16GB)" required />

                <input className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none" type="text" name="storage" placeholder="Storage (e.g., 512GB SSD)" required />

                <input className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none" type="text" name="graphics" placeholder="Graphics (Integrated/Nvidia/etc.)" />

                <input className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none" type="text" name="display" placeholder="Display Size (e.g., 15.6')" />

                <input className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none" type="number" name="price" placeholder="Price" required />

                <input className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none" type="text" name="os" placeholder="OS (Default: Windows 11)" />

                <input className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none" type="number" name="stock" placeholder="Stock Quantity" />

                <textarea className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none resize-none" name="description" placeholder="Description"></textarea>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Images (max 4)</label>
                    <input 
                        type="file" 
                        name="images" 
                        multiple 
                        className="w-full border border-gray-300 rounded-lg p-3"
                    />
                </div>
            </div>

            <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Add Laptop
            </button>
        </form>
    );
};


const Panel = () => {
  const { user } = useAuth();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Panel</h1>
        <div className="space-y-3">
          <p className="text-gray-700"><span className="font-semibold">Name:</span> {user?.fullname}</p>
          <p className="text-gray-700"><span className="font-semibold">Email:</span> {user?.email}</p>
          <p className="text-gray-700"><span className="font-semibold">Role:</span> {user?.role}</p>
        </div>
      </div>

      {
        (user.role === "admin" || user.role === "moderator") && (
            <>
                <Catalog />
                <AddLaptop />
            </>
        )
      }
    </main>
  );
};

export default Panel;
