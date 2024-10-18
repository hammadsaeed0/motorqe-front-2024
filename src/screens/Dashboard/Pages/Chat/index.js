import React, { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  unread,
  sent,
  received,
  threedots,
  bluewhatsap,
  phone,
  smily,
  thumb,
  receiverimg,
} from "../../../../assets/icons/icons";
import { inbox, senderimg } from "../../../../assets/images/images";
import Dropdown from "./optionModal";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import DashboardNavbar from "../../NavBAr/DashboardNavbar";
import axios from "axios";
import { Base_url } from "../../../../utils/Base_url";
import { useSelector } from "react-redux";
import moment from "moment";

const Inbox = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const user = useSelector((state) => state.authReducer);
  const [allRooms, setAllRooms] = useState([]);
  const [singleChat, setSingleChat] = useState({});
  console.log(singleChat);
  
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  useEffect(() => {
    axios
      .get(`${Base_url}/user/my-chat/${user?.userToken}`)
      .then((res) => {
        setAllRooms(res?.data?.chats);
        console.log(res);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  const GetSingleChat = (id) => {
    const params = {
      userId1: user?.userToken,
      userId2: id,
    };

    axios
      .post(`${Base_url}/user/single-chat`, params)
      .then((res) => {
        setSingleChat(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SendMessage = (e) => {
    e.preventDefault();

    const params = {
      chatId: singleChat?.chat?._id,
      senderId: user?.userToken,
      text: message,
    };

    axios
      .post(`https://new-motorqe-backend.vercel.app/v1/user/send-message`, params)
      .then((res) => {
        const newMessage = {
          text: message,
          createdAt: new Date(),
          senderId: user?.userToken,
        };
        setSingleChat((prevChat) => ({
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        }));
        setMessage("");
        scrollToBottom(); // Scroll to bottom after sending message
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // if (singleChat.messages) {
      // scrollToBottom(); // Scroll to bottom when messages change
    // }
  }, []);

  return (
    <>
      <Header />
      <DashboardNavbar />
      <div className="flex flex-col items-center mb-4">
        <div className="mt-16 flex items-center justify-between w-[90%]">
          <h1 className="font-inter text-3xl font-semibold pb-5 text-left">Inbox:</h1>
        </div>
        <div className="w-[90%]">
          <div className="ring ring-[#FB5722] rounded-[15px] mt-4">
            <div className="flex justify-between h-[75px] w-full bg-gray-50 rounded-tl-[15px] rounded-tr-[15px] ring-1 ring-[#FB5722]">
              {/* Chat Header */}
              <div className="ring-1 ring-[#FB5722] bg-[#F3F3F5] w-[35%] flex  items-center rounded-tl-[15px]">
                <div>
                  <div className="h-[30px] flex pl-2">
                    <img src={inbox} alt="inbox" className="h-5" />
                    <p className="font-bold text-[#FB5722] items-center">Inbox</p>
                  </div>
                  <div className="border-b border-[#FB5722] w-[55px] relative pt-1 ml-1"></div>
                </div>
                {/* <div className="flex">
                  <img src={sent} alt="sent" className="h-5" />
                  <p className="text-20 font-semibold tracking-wider text-left text-[#0C0CB8]">Sent</p>
                </div> */}
                {/* <div className="flex">
                  <img src={unread} alt="unread" className="h-5" />
                  <p className="text-20 font-semibold tracking-wider text-left text-[#0C0CB8]">Unread</p>
                </div> */}
              </div>
              {/* Right Side */}
              <div className="ring-1 ring-[#FB5722] bg-[#F3F3F5] w-[65%] flex   justify-between items-center rounded-tr-[15px]">
                <div className="flex">
                  <div className="p-2">
                    {singleChat?.chat?.participants?.[0]?.image?
                    <img src={singleChat?.chat?.participants?.[0]?.image} className="h-14 w-14 rounded-full" alt="Sender" />:<img src={require('../../../../assets/images/logo.png')} className="h-14 w-14 rounded-full" alt="Sender" />
                  }
                    
                  </div>
                  <div className="   pt-2">
                    <strong className="text-20 font-semibold leading-24  py-2 tracking-wider text-left">
                      {singleChat?.chat?.participants?.[0]?.username}
                    </strong>
                    {/* <p className="text-[#686464] font-semibold leading-24 tracking-wider text-left">QR 130,000</p> */}
                    <p className="font-inter text-[#686464] text-sm font-normal leading-6 tracking-wider text-left">{singleChat?.chat?.participants?.[0]?.email}</p>
                  </div>
                </div>
                <div className="flex gap-1 mr-4">
                  <div className="p-2">
                    <img src={bluewhatsap} className="h-6" alt="WhatsApp" />
                  </div>
                  <div className="p-2">
                    <img src={phone} className="h-6" alt="Phone" />
                  </div>
                  {/* <div className="p-2">
                    <button onClick={toggleDropdown} className="relative">
                      <img src={threedots} className="h-6" alt="Options" />
                      {isDropdownOpen && (
                        <Dropdown
                          isOpen={isDropdownOpen}
                          onClose={() => setDropdownOpen(false)}
                        />
                      )}
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="flex w-full min-h-[70vh] overflow-x-auto">
              {/* Chat Body Left Side */}
              <div className="ring-1 ring-[#FB5722] w-[35%] flex rounded-bl-[15px]">
                <div className="w-full">
                  {allRooms?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => GetSingleChat(item?.participants?.[0]?._id)}
                      className="flex w-full p-2 border-b border-[#FB5722] bg-[#F3F3F5]"
                    >
                      <div className="flex gap-4 w-full items-center">
                        <div>
                          {item?.participants?.[0]?.image ? (
                            <img
                              src={item?.participants?.[0]?.image}
                              className="w-16 h-16 rounded-[50%]"
                              alt="Participant"
                            />
                          ) : (
                            <img
                              src={require("../../../../assets/images/logo.png")}
                              className="w-16 h-16 rounded-[50%]"
                              alt="Default"
                            />
                          )}
                        </div>
                        <div>
                          <strong className="font-inter text-lg font-semibold leading-6 tracking-wider text-left">
                            {item?.participants?.[0]?.username}
                          </strong>
                          <p className="font-inter text-base font-normal leading-6 tracking-wide text-left text-[#777777]">
                            {item?.lastMessage?.text}
                          </p>
                        </div>
                      </div>
                      <div className="w-28">
                        <p className="font-inter text-sm font-normal leading-5 tracking-wide mr-2">
                          {moment(item?.lastMessage?.createdAt).format("DD-MM-YYYY")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Body Right Side */}
              <div className="flex flex-col w-[65%] pt-2 rounded-br-[15px] min-h-[70vh]">
                <div className="h-80 overflow-x-auto px-12">
                  {singleChat?.messages?.length > 0 ? (
                    singleChat.messages.map((item, index) => (
                      <div
                      ref={messagesEndRef}
                        key={index}
                        className={`flex gap-3 items-center ${item.sender === user?.userToken ? 'justify-end' : 'justify-start'} pt-4`}
                      >
                        {/* {item.sender !== user?.userToken && (
                          <img src={receiverimg} className="rounded-[50%] w-14" alt="Receiver" />
                        )} */}
                        <div
                          className={`p-2 h-10 max-w-[350px] ${item.sender === user?.userToken ? 'bg-[#F3F3F5]' : 'bg-[#F3F3F5]'} items-center flex font-inter text-base tracking-wide text-[#545151]`}
                        >
                          <p className="items-center flex font-inter text-base tracking-wide text-[#545151]">
                            {item.text}
                          </p>
                        </div>
                        {/* {item.sender === user?.userToken && (
                          <img src={senderimg} className="rounded-[50%] w-14" alt="Sender" />
                        )} */}
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-gray-500">No messages found.</p>
                    </div>
                  )}
                  {/* <div ref={messagesEndRef} /> This will help us scroll to the bottom */}
                </div>

                {/* Send Message Field */}
                <div className="flex-grow flex bg-white flex-col justify-end w-full h-[100px] rounded-[10px]">
                  <form
                    onSubmit={SendMessage}
                    className="flex ring-1 ring-[#FB5722] rounded-[15px] p-2 mb-5 w-[95%] ml-[2.5%] h-[100px] bg"
                  >
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="5"
                      placeholder="Type Text Here..."
                      className="w-[90%] p-1 rounded-[15px] h-[70px] resize-none focus:outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          SendMessage(e);
                        }
                      }}
                    ></textarea>
                    <div className="flex gap-3">
                      <img src={smily} className="h-5" alt="Smile" />
                      <img src={thumb} className="h-5" alt="Thumb" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Inbox;
