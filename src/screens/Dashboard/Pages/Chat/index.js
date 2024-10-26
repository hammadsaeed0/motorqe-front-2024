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
import { BsFillSendFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";

const Inbox = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const user = useSelector((state) => state.authReducer);
  const [allRooms, setAllRooms] = useState([]);
  const [singleChat, setSingleChat] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${Base_url}/user/my-chat/${user?.userToken}`)
      .then((res) => {
        setAllRooms(res?.data?.chats);
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
        console.log(res);

        setSingleChat(res?.data);
        setSelectedUserId(id); // Set the selected user ID
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SendMessage = (e) => {
    // e.preventDefault();

    const params = {
      chatId: singleChat?.chat?._id,
      senderId: user?.userToken,
      text: message,
    };

    axios
      .post(
        `https://new-motorqe-backend.vercel.app/v1/user/send-message`,
        params
      )
      .then((res) => {
        const newMessage = {
          text: message,
          createdAt: new Date(),
          senderId: user?.userToken,
        };

        console.log(res);

        setSingleChat((prevChat) => ({
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        }));
        setMessage("");

      })
      .catch((error) => {
        console.log(error);

        if (error?.response?.data?.success === false) {
          toast.error(error?.response?.data?.message)
        }
      });
  };

  // Ref for the chat container
  const chatContainerRef = useRef(null);

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // Auto-scroll to bottom when component mounts or messages change
  useEffect(() => {
    if (singleChat?.messages?.length > 0) {
      scrollToBottom();
    }
  }, [singleChat.messages]);


  const otherParticipant = singleChat?.chat?.participants?.find(
    (participant) => participant._id !== user?.userToken
  );



  const DeleteConversation = () => {
    const params = {
      chatId: singleChat?.chat?._id,
      userId: user?.userToken
    }
    axios
      .post(`${Base_url}/user/delete-chat`, params)
      .then((res) => {
        console.log(res);

        window.location.reload();
        axios
          .get(`${Base_url}/user/my-chat/${user?.userToken}`)
          .then((res) => {
            setAllRooms(res?.data?.chats);
          })
          .catch((error) => {
            console.log(error);
          });

      })
      .catch((error) => {
        console.log(error);
      });
  }

  const otherParticipants = singleChat?.participants?.find(
    (participant) => participant._id !== user?.userToken
  );
  console.log(otherParticipant);

  const BlockConversation = () => {
    const params = {
      blockUserId: otherParticipants?._id,
      userId: user?.userToken
    }
    axios
      .post(`${Base_url}/user/block-user`, params)
      .then((res) => {
        console.log(res);
        axios
          .get(`${Base_url}/user/my-chat/${user?.userToken}`)
          .then((res) => {
            setAllRooms(res?.data?.chats);


          })
          .catch((error) => {
            console.log(error);
          });

      })
      .catch((error) => {
        console.log(error);

        toast.error(error?.response?.data?.message)
      });
  }

  return (
    <>
      <Header />
      <DashboardNavbar />
      <div className="flex flex-col items-center mb-4">
        <div className="mt-16 flex items-center justify-between w-[90%]">
          <h1 className="font-inter text-3xl font-semibold pb-5 text-left">
            Inbox:
          </h1>
        </div>
        <div className="w-[90%]">
          <div className="ring ring-[#FB5722]  overflow-hidden rounded-[15px] mt-4">
            <div className="flex w-full min-h-[70vh] overflow-x-auto">
              {/* Chat Body Left Side */}
              <div className="ring-1 ring-[#FB5722]  w-[35%] flex rounded-bl-[15px]">
                <div className=" w-full">
                  <div className=" bg-[#F3F3F5] h-[73px]">
                    <h1 className=" p-4  m-0  text-primary font-semibold text-xl">
                      Chats
                    </h1>
                  </div>
                  <div className="w-full">
                    {allRooms?.map((item, index) => {
                      const otherParticipant = item.participants.find(
                        (participant) => participant._id !== user?.userToken
                      );

                      if (!otherParticipant) return null;

                      return (
                        <div
                          key={index}
                          onClick={() => GetSingleChat(otherParticipant._id)}
                          className={`flex w-full p-2.5 hover:bg-primary hover:text-white border-b cursor-pointer border-[#FB5722] bg-[#F3F3F5] ${selectedUserId === otherParticipant._id
                            ? "bg-[#FB5722] text-white"
                            : ""
                            }`}
                        >
                          <div className="flex gap-4 w-full items-center">
                            <div>
                              {otherParticipant.image ? (
                                <img
                                  src={otherParticipant.image}
                                  className="w-14 h-14 rounded-[50%]"
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
                                {otherParticipant.username}
                              </strong>
                              <p className="font-inter text-base font-normal leading-6 tracking-wide text-left">
                                {item.lastMessage?.text || "No messages yet"}
                              </p>
                            </div>
                          </div>
                          <div className="w-28">
                            <p className="font-inter text-sm font-normal leading-5 tracking-wide mr-2">
                              {item.lastMessage
                                ? moment(item.lastMessage.createdAt).format(
                                  "DD-MM-YYYY"
                                )
                                : moment(item.createdAt).format("DD-MM-YYYY")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Chat Body Right Side */}

              <div className="flex flex-col w-[65%]  rounded-br-[15px] min-h-[70vh]">
                <div className="ring-1 p-3 ring-[#FB5722] bg-[#F3F3F5]  w-full flex justify-between items-center rounded-tr-[15px]">
                  <div className="flex items-center">
                    <div className="p-2">
                      {otherParticipant?.image ? (
                        <img
                          src={otherParticipant.image}
                          className="h-12 w-12 rounded-full"
                          alt="Sender"
                        />
                      ) : (
                        <img
                          src={require("../../../../assets/images/logo.png")}
                          className="h-12 w-12 rounded-full"
                          alt="Sender"
                        />
                      )}
                    </div>
                    <div className="">
                      <strong className="text-20 font-semibold leading-24  tracking-wider text-left">
                        {otherParticipant?.username}{" "}
                        {/* Updated to access the correct property */}
                      </strong>
                      {/* <p className="font-inter text-[#686464] text-sm font-normal leading-6 tracking-wider text-left">
                        {otherParticipant?.email}{" "}
                        
                      </p> */}
                    </div>
                  </div>
                  <div className="flex items-center  gap-3">
                    <div className="">
                      <img src={bluewhatsap} className="h-6" alt="WhatsApp" />
                    </div>
                    <div className="">
                      <img src={phone} className="h-6" alt="Phone" />
                    </div>
                    <div className=' pt-1'>
                      <button onClick={toggleDropdown} className="relative">
                        <img src={threedots} onClick={toggleDropdown} className=' w-8'></img>
                        {isDropdownOpen && (
                          <Dropdown onReportFun={() => BlockConversation()} onClick={() => DeleteConversation()} isOpen={isDropdownOpen} onClose={() => setDropdownOpen(false)} />
                        )}
                      </button> </div>
                  </div>
                </div>
                <div className="h-80 my-2 overflow-y-auto px-12" ref={chatContainerRef}  >
                  {singleChat?.messages?.length > 0 ? (
                    singleChat.messages.map((item, index) => (
                      <div

                        key={index}
                        className={`flex gap-3 items-center ${item.sender === user?.userToken
                          ? "justify-end"
                          : "justify-start"
                          } pt-4`}
                      >
                        <div
                          className={`p-2 h-10  rounded-sm max-w-[350px] ${item.sender === user?.userToken
                            ? "bg-[#F3F3F5]"
                            : " bg-primary text-white "
                            } items-center flex font-inter text-base tracking-wide text-[#545151]`}
                        >
                          <p className={`items-center flex font-inter text-base tracking-wide ${item.sender === user?.userToken ? 'text-[#545151] ' : ' text-white'} `}>
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-gray-500">No messages found.</p>
                    </div>
                  )}

                  {/* <div ref={messagesEndRef}></div> */}
                </div>

                {/* Send Message Field */}
                <div className="flex-grow flex  mt-2 flex-col justify-end w-full h-[100px] rounded-[10px]">
                  <form
                    onSubmit={SendMessage}
                    className="flex ring-1 ring-[#FB5722] rounded-[15px] p-2 mb-5 w-[95%] ml-[2.5%] h-[100px]"
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

                    {/* Action buttons for sending message */}
                    <div className="flex flex-col justify-between">
                      <div className="flex gap-3">
                        <img src={smily} className="h-5" alt="Smile" />
                        <img src={thumb} className="h-5" alt="Thumb" />
                      </div>

                      {/* Send button */}
                      <div
                        onClick={() => SendMessage()} // Calls SendMessage when clicked
                        className="cursor-pointer pt-6 pl-6"
                      >
                        <IoSend className="text-primary" size={30} />
                      </div>
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
