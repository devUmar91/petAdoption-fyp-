import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PetsContext } from "../Context/context";

const PetListPage = () => {
  const { pets } = useContext(PetsContext);

  return (
    <div className="min-h-screen bg-gray-200 text-gray-800  px-6 pt-24"> {/* Adjusted padding-top */}
      <h2 className="text-4xl font-extrabold text-center mb-12 tracking-wide">
        Available Pets
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-2xl font-bold text-gray-100 mb-2">
                {pet.name}
              </h3>
              <p className="text-gray-400 mb-4">{pet.breed}</p>
              <p
                className={`mb-4 ${
                  pet.adoptionStatus === "Adopted"
                    ? "text-red-500"
                    : pet.adoptionStatus === "Available"
                    ? "text-green-500"
                    : pet.adoptionStatus === "Pending"
                    ? "text-orange-500"
                    : "text-gray-400"
                }`}
              >
                {pet.adoptionStatus}
              </p>
              <Link
                to={`/pets/${pet.id}`}
                className="block text-center bg-indigo-500 hover:bg-indigo-400 text-white py-2 rounded-lg transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetListPage;
