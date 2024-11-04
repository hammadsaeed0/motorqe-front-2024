import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ComparisonModal = ({ isOpen, carData, onClose, getData }) => {
    const navigate = useNavigate();

  if (!isOpen) return null;
 

  

  const handleCheckboxChange = () => {
    if (getData.length === 2 || getData.length===3) { 
        navigate("/compare-car", { state: { cars: getData } });
    } else {
        toast.error("Please select exactly 2 cars for comparison."); 
    }
};

  return (
    <div className="fixed inset-0 flex items-center z-40 justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl">
        <h2 className="text-lg font-bold mb-4">Compare Cars</h2>
        
        {getData?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getData.map((car) => (
              <div key={car._id} className="border p-4 rounded-lg shadow">
                <img
                  src={car.car_images[0]}
                  alt={car.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="text-md font-bold">{car.title}</h3>
                <p className="text-sm">Make: {car.make}</p>
                <p className="text-sm">Model: {car.model}</p>
                <p className="text-sm">Year: {car.year}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No cars found based on the selected filters.</p>
        )}

       <div className=' flex justify-center items-center py-4'>
       <button
          onClick={()=>handleCheckboxChange()}
          className="mt-4 bg-primary text-white py-2 px-5 rounded-full"
        >
          Compare Now
        </button>
       </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
