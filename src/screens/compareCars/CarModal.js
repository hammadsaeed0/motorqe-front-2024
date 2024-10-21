import React from 'react';

const CarModal = ({ isOpen, carData, onClose, getData, onSelect }) => {
  if (!isOpen) return null;
console.log(getData);

  return (
    <div className="fixed inset-0 flex items-center z-40 justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl">
        <h2 className="text-lg font-bold mb-4">Select a Car</h2>
        {getData?.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Title</th>
                <th className="border border-gray-300 p-2">Image</th>
                <th className="border border-gray-300 p-2">Make</th>
                <th className="border border-gray-300 p-2">Model</th>
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">Select</th>
              </tr>
            </thead>
            <tbody>
              {getData?.map((car) => (
                <tr key={car._id}>
                  <td className="border border-gray-300 p-2 text-center">{car.title}</td>
              
                  <td className="border border-gray-300 p-2">
                  <img src={car?.car_images[0]} alt='' className=' w-28 h-20 mx-auto rounded-lg'   />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">{car.make}</td>
                  <td className="border border-gray-300 p-2 text-center">{car.model}</td>
                  <td className="border border-gray-300 p-2 text-center">{car.year}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => onSelect(car)}
                      className=" bg-primary text-white py-1 px-3  rounded-full"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No cars found based on the selected filters.</p>
        )}

        <button onClick={onClose} className="mt-4  bg-primary text-white py-2 px-5  rounded-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default CarModal;
