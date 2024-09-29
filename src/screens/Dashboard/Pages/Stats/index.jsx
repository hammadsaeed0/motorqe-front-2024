import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import Modal from "../../../../components/modal";
import { Base_url } from "../../../../utils/Base_url";
import eyeicon from "../../../../assets/icons/eyeicon.png";
import insight from "../../../../assets/icons/insight.png";
import btnclick from "../../../../assets/icons/btnclicks.png";
import blackeye from "../../../../assets/icons/blackeye.png";
import whatsapp from "../../../../assets/icons/whatsapp.png";
import phone from "../../../../assets/icons/phone.png";
import message from "../../../../assets/icons/message.png";
import share from "../../../../assets/icons/share.png";
import devices from "../../../../assets/icons/devices.png";
import desktop from "../../../../assets/icons/desktop.png";
import mobile from "../../../../assets/icons/mobile.png";

const ViewStats = ({
  isModalOpen,
  setIsModalOpen,
  closeModal,
  getData,
}) => {
    console.log(getData);
    

    const [analytics, setAnalytics] = useState([]);

    console.log(analytics?.messageClicks);
    
  useEffect(() => {
    axios
    .get(`${Base_url}/user/single-car-analytic/${getData?._id}`)
    .then((res) => {
      console.log(res, "/user button click");

      setAnalytics(res?.data?.data);
    })
    .catch((error) => {});
  }, []);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal} className={''}>
        <div className="">
          <div className="p-3 flex justify-between items-center">
            <div></div>
            <h1 className="capitalize  font-semibold">View Stats</h1>
            <MdClose onClick={() => setIsModalOpen(false)} size={25} />
          </div>
          <hr />
          <div className="p-5 flex flex-col gap-4">
             {/* ____Box--1____ */}
             <div class=" w-full h-[150px]  border-5 border border-solid border-[#F0E9E9] rounded-20  bg-[#F3F3F5] rounded-[20px]">
              <div className="flex gap-2 items-center mx-[20px] my-[20px]">
                <img src={eyeicon} className="h-[34px] w-[34px]"></img>
                <strong className="text-[#0C0CB8]">Views</strong>
              </div>

              <div className="flex ml-6 justify-between mr-6">
                <div className="text-[#0C0CB8] text-base flex-col gap-7">
                  <img src={insight} alt="" />
                  <strong>{analytics?.last24HoursViews}</strong>
                  <p className=" text-sm">Last 24 hours</p>
                </div>

                <div className="text-[#0C0CB8]  flex-col gap-7">
                  <img src={insight} alt="" />
                  <strong>{analytics?.last7DaysViews}</strong>
                  <p className=" text-sm">Last 7 hours</p>
                </div>

                <div className="text-[#0C0CB8]  flex-col gap-7">
                  <img src={insight} alt="" />
                  <strong>{analytics?.last30DaysViews}</strong>
                  <p className=" text-sm">Last 30 hours</p>
                </div>
              </div>
            </div>
           <div className=" flex gap-4">
             {/* ____Box--2____ */}
             <div class="w-[350px] h-[210px]  border-5 border border-solid border-[#F0E9E9] rounded-20  bg-[#F3F3F5] rounded-[20px]">
              <div className="flex gap-2 items-center mx-[20px] mt-[10px]">
                <img src={btnclick} className="h-[34px] w-[34px]"></img>
                <strong className="text-[#484848]">Devices</strong>
              </div>
              <span className=" mx-[20px]">Showrooms</span>

              <div className="ml-6 mr-6 justify-between flex-col">
                <div className="text-[#0C0CB8] flex items-center gap-3 mt-1">
                  <img src={blackeye} alt="" />
                  <p className="text-sm">
                    Views ( {analytics?.totalClicks} clicks)
                  </p>
                </div>

                <div className="text-[#0C0CB8] flex items-center gap-3 mt-1">
                  <img src={whatsapp} alt="" />
                  <p className="text-sm">
                    whatsapp ( {analytics?.whatsappClicks} clicks)
                  </p>
                </div>

                <div className="text-[#0C0CB8] flex items-center gap-3 mt-1">
                  <img src={phone} alt="" />
                  <p className="text-sm">
                    Call ({analytics?.callClicks} clicks)
                  </p>
                </div>

                <div className="text-[#0C0CB8] flex items-center gap-3 mt-1">
                  <img src={message} alt="" />
                  <p className="text-sm">
                    Message ({analytics?.messageClicks} clicks)
                  </p>
                </div>

                <div className="text-[#0C0CB8] flex items-center gap-3 mt-3">
                  <img src={share} alt="" />
                  <p className="text-sm">
                    Share ( {analytics?.shareClicks} clicks)
                  </p>
                </div>
              </div>
            </div>
            {/* ____Box--3____ */}
            <div class=" mb-2 w-[350px] h-[135px]  border-5 border border-solid border-[#F0E9E9] rounded-20  bg-[#F3F3F5] rounded-[20px]">
              <div className="flex gap-2 items-center mx-[20px] my-[20px]">
                <img src={devices} className="h-[34px] w-[34px]"></img>
                <strong className="text-[#484848]">Button Clicks</strong>
              </div>

              <div className="ml-6 mr-6 justify-between flex-col">
                <div className="text-[#0C0CB8] flex items-center gap-3 mt-3">
                  <img src={desktop} alt="" />
                  <p className="text-sm">
                    Desktop ( {analytics?.views} Views)
                  </p>
                </div>

                <div className="text-[#0C0CB8] flex items-center gap-3 mt-3">
                  <img src={mobile} alt="" />
                  <p className="text-sm">
                    Mobile ( {analytics?.views} Views)
                  </p>
                </div>
              </div>
            </div>
           </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewStats;
