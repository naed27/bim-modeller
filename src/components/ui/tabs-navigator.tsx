import { cn } from "@/lib/utils";
import React, { ReactNode, useLayoutEffect, useState } from "react";

interface Tab {
  title: string;
  content: ReactNode;
  className?: string;
}

export const TabsNavigator = ({
  tabs,
  currentTab = 0,
}: {
  tabs: Tab[];
  currentTab?: number,
}) => {

  const [activeTab, setActiveTab] = useState(0);

  useLayoutEffect(()=>{
    setActiveTab(currentTab)
  },[currentTab])

  return (
    <div className="relative flex h-full bg-inherit overflow-hidden">
      <div className="absolute inset-0 flex flex-col bg-inherit">
        <div className="mb-4 flex overflow-x-auto border-b border-gray-500 bg-inherit md:justify-center">
          {tabs.map((tab, index) => (
            <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`whitespace-nowrap border-b-2 px-6 py-3 text-base font-medium tracking-wide transition-all ${activeTab === index ? "border-gray-500 font-bold text-gray-200" : "border-transparent text-gray-400 hover:text-gray-200"}`}>
              {tab.title}
            </button>
          ))}
        </div>
        <div className="relative w-full grow overflow-hidden">
          <div className={cn("absolute inset-0 overflow-auto", tabs?.[activeTab]?.className)}>
            {tabs[activeTab]?.content}
          </div>
        </div>
      </div>
    </div>
  );
};
