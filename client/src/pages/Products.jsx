import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { useLeptop } from "../context/leptops.context";

const Laptop = ({ laptop }) => {
  const { deleteLeptop, updateLaptop, leptops, addToCart } = useLeptop();
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  // Editable fields (excluding DB-related and availability fields)
  const editableFields = Object.keys(laptop).filter(
    (key) => !["_id", "__v", "createdAt", "updatedAt", "isAvailable"].includes(key)
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await updateLaptop(laptop._id, formData);
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      {/* Images */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {laptop.image?.map((image, index) => (
          <img
            key={index}
            src={laptop.image?.[0]}
            alt={laptop.name}
            srcSet={laptop.image?.[1]}
            className="w-full h-48 object-cover rounded mb-4"
            />
        ))}
      </div>

      {editing ? (
        <form onSubmit={handleUpdate} className="flex flex-col gap-2">
          {editableFields.map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-xs text-gray-500">{key}</label>
              {key === "image" ? (
                <input
                    type="file"
                    name="images"
                    multiple
                    className="border rounded px-2 py-1"
                />
                ) : (
                <input
                    type="text"
                    name={key}
                    defaultValue={laptop[key] || ""}
                    className="border rounded px-2 py-1"
                />
                )}
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-lg font-semibold">
            {laptop.brand} - {laptop.model}
          </h2>
          <p className="text-sm text-gray-600">Processor: {laptop.processor || "N/A"}</p>
          <p className="text-sm text-gray-600">
            RAM/Storage: {laptop.ram || "N/A"}/{laptop.storage || "N/A"}
          </p>
          <p className="text-sm text-gray-600">Graphics: {laptop.graphics || "N/A"}</p>
          <p className="text-sm text-gray-600">Display: {laptop.display || "N/A"}</p>
          <p className="text-sm text-gray-600">OS: {laptop.os || "N/A"}</p>
          <p className="mt-2 text-gray-700">Description: {laptop.description || "No description"}</p>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-medium">
              Price: ${laptop.price || 0} · Stock: {laptop.stock || 0}
            </span>

            {user?.role === "admin" ? (
              <div className="flex gap-2">
                <button
                  onClick={() => deleteLeptop(laptop._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditing(true)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            ) : (
              <button onClick={() => addToCart(laptop)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                Add to Cart
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const LaptopList = () => {
  const { leptops } = useLeptop();

  if (!leptops || leptops.length === 0) {
    return <p className="text-gray-500">No leptops found.</p>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {leptops.map((laptop) => (
        <Laptop key={laptop._id} laptop={laptop} />
      ))}
    </section>
  );
};

const Catalog = () => {
  const { user } = useAuth();

  return (
    <main className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Laptops</h1>
        {user ? (
          <span className="text-sm text-gray-700">Signed in as {user.name || user.email}</span>
        ) : (
          <span className="text-sm text-gray-500">Browse</span>
        )}
      </div>

      <LaptopList />
    </main>
  );
};

export default Catalog;
