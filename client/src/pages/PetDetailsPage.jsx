import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PetsContext } from "../Context/context";

const PetDetailsPage = () => {
  const { id } = useParams();
  const { getPetById } = useContext(PetsContext);
  const [message, setMessage] = useState(""); // State to hold the user's message

  const pet = getPetById(id);

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 py-12 px-6">
        <h2 className="text-4xl font-bold text-center text-red-500 mb-12">
          Pet not found
        </h2>
      </div>
    );
  }

  // Function to redirect to WhatsApp with the custom message
  const handleAdoptionRequest = () => {
    if (pet.contactNumber) {
      const encodedMessage = encodeURIComponent(`Query about ${pet.name}. ${message}`);
      const whatsappUrl = `https://wa.me/${pet.contactNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    } else {
      alert("No contact number available for this pet.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-[80px] px-6">
      <div className="flex flex-col md:flex-row items-center bg-gray-800 p-6 rounded-lg shadow-lg">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full md:w-1/2 h-72 object-cover rounded-lg mb-8 md:mb-0 shadow-md"
        />
        <div className="md:ml-8 text-center md:text-left">
          <h2 className="text-5xl font-extrabold mb-4 text-indigo-400">
            {pet.name}
          </h2>
          <p className="text-lg font-semibold mb-2">Breed: {pet.breed}</p>
          <p className="text-lg font-semibold mb-2">Age: {pet.age}</p>
          <p className="text-lg font-semibold mb-2">
            Status:
            <span
              className={
                pet.adoptionStatus === "Adopted"
                  ? "text-red-500"
                  : pet.adoptionStatus === "Pending"
                  ? "text-orange-500"
                  : "text-green-500"
              }
            >
              {` ${pet.adoptionStatus}`}
            </span>
          </p>
          <p className="text-lg mb-6">{pet.description}</p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            className={`w-full p-4 mt-4 bg-gray-700 rounded-lg text-gray-200 resize-none h-32 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              pet.adoptionStatus === "Adopted" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={pet.adoptionStatus === "Adopted"}
          />
          <div className="flex mt-8 space-x-4">
            {
              <button
              onClick={handleAdoptionRequest}
              className={`bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-indigo-600 shadow-lg transform hover:scale-105 ${
                pet.adoptionStatus === "Adopted" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={pet.adoptionStatus === "Adopted"}
            >
              Contact on WhatsApp
            </button>
            
            }
            <Link
              to="/pets"
              className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-indigo-600 shadow-lg transform hover:scale-105"
            >
              Back to Pets Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;
