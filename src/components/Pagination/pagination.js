import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-between items-center mt-4">
      <p className='text-[#8B8989]'>{`Showing ${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
        currentPage * itemsPerPage,
        totalItems
      )} of ${totalItems} Cars`}</p>
      <div className="flex space-x-2">
        {/* Add your pagination buttons here if needed */}
      </div>
    </div>
  );
};

export default Pagination;
