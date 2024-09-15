import React, { useState } from "react";

const Tabs = ({ tabs, defaultTab, className, Icons }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      <div className="flex bg-transparent border-2 rounded-md border-white border-opacity-20 backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            className={`px-4 flex justify-center items-center gap-2 py-2 ${className} ${
              activeTab === tab.title
                ? "  w-full text-black   bg-[#BAB9B9] "
                : "bg-[#DCD9D9]  text-black  flex gap-3 justify-center w-full"
            }`}
            onClick={() => setActiveTab(tab.title)}
          >
            
            {tab.Icons} <span>{tab.title}</span>
          </button>
        ))}
      </div>
      <div className="">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={activeTab === tab.title ? "" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
