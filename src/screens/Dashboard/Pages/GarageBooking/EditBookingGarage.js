import React, { useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import Modal from "../../../../components/modal";
import { Base_url } from "../../../../utils/Base_url";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const EditBooking = ({ isModalOpen, setIsModalOpen, closeModal, getData,setGetBooking }) => {
  const [rescheduleDate, setRescheduleDate] = useState(getData?.date || "");
  const [rescheduleTime, setRescheduleTime] = useState(getData?.time || "");
  const [contactNumber, setContactNumber] = useState(getData?.contactNumber || "");
  const [loading, setLoading] = useState(false);

  const handleDateChange = (e) => setRescheduleDate(e.target.value);
  const handleTimeChange = (e) => setRescheduleTime(e.target.value);
  const handleContactChange = (e) => setContactNumber(e.target.value);
  const user = useSelector((state) => state.authReducer);
  const submitReschedule = () => {
    setLoading(true);
    axios
      .patch(`${Base_url}/user/book-garage`, {
        bookingId: getData._id,
        date: rescheduleDate,
        time: rescheduleTime,
        contactNumber: contactNumber,
      })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          toast.success(response.data.message);
          setIsModalOpen(false);
          axios
          .get(`${Base_url}/user/user-garage-booking/${user?.userToken}`)
          .then((res) => {
            const pendingBookings = res?.data?.bookings?.filter(
              (booking) => booking.status === "pending" || booking.stats === "approved"
            );
            setGetBooking(pendingBookings);
            console.log(pendingBookings);
          })
          .catch((err) => {});
        }
      })
      .catch((error) => {
        console.error("Error rescheduling:", error);
        setLoading(false);
        toast.error("Failed to reschedule booking.");
      });
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} className="">
      <div className="p-3 flex justify-between items-center">
        <h1 className="capitalize font-semibold">Edit Booking</h1>
        <MdClose onClick={() => setIsModalOpen(false)} size={25} />
      </div>
      <hr />
      <div className="p-5 flex flex-col gap-4">
        {/* <div>
          <label className="block font-medium mb-2">Select New Date:</label>
          <input
            type="date"
            value={rescheduleDate}
            onChange={handleDateChange}
            className="border rounded p-2 w-full"
          />
        </div> */}
        <div>
          <label className="block font-medium mb-2">Select New Time:</label>
          <input
            type="time"
            value={rescheduleTime}
            onChange={handleTimeChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Contact Number:</label>
          <input
            type="text"
            value={contactNumber}
            onChange={handleContactChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          onClick={submitReschedule}
          className={`mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-secondary ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default EditBooking;
