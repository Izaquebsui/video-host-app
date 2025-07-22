// src/components/TabsContainer.jsx
import React, { useState } from "react";

export default function TabsContainer({ children }) {
  const tabs = React.Children.toArray(children);
  const [activeTab, setActiveTab] = useState(0);

  // Protege caso não haja children ou não seja array
  if (!tabs.length) {
    return (
      <div className="w-full p-6 bg-zinc-900 rounded-lg text-zinc-400 text-center">
        Nenhuma aba disponível.
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="flex gap-4 border-b border-zinc-700 mb-4">
        {tabs.map((child, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm rounded-t transition ${
              activeTab === index
                ? "bg-zinc-800 text-pink-400 border-b-2 border-pink-500 font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {child.props.label}
          </button>
        ))}
      </div>

      <div className="bg-zinc-900 p-4 rounded-lg shadow-md border border-zinc-700 min-h-[200px]">
        {tabs[activeTab]}
      </div>
    </div>
  );
}
