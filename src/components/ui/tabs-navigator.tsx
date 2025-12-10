import { cn } from "@/lib/utils";
import React, { ReactNode, useState } from "react";

interface Tab {
  title: string;
  content: ReactNode;
  className?: string;
}

interface TabsNavigatorProps {
  tabs: Tab[];
  initialTab?: number;
}

export const TabsNavigator: React.FC<TabsNavigatorProps> = ({
  tabs,
  initialTab = 0,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="relative flex h-full flex-col bg-inherit">
      <div className="mb-4 flex overflow-x-auto border-b border-gray-500 bg-inherit md:justify-center">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`whitespace-nowrap border-b-2 px-6 py-3 text-xs font-medium tracking-wide transition-all ${activeTab === index ? "border-gray-500 font-bold text-gray-200" : "border-transparent text-gray-400 hover:text-gray-200"}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="relative w-full grow">
        <div className={cn("tab-content h-full", tabs?.[activeTab]?.className)}>
          {tabs[activeTab]?.content}
        </div>
      </div>
    </div>
  );
};
