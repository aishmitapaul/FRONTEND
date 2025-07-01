import React from "react";
import {
  BriefcaseIcon,
  CpuChipIcon,
  TrophyIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

export default function CategoryTabs({ categories, selected, onSelect }) {
  
  const iconsMap = {
    business: BriefcaseIcon,
    technology: CpuChipIcon,
    sports: TrophyIcon,
    health: HeartIcon,
  };

  return (
    <div className="flex flex-wrap gap-3 px-6 py-4">
      {categories.map((cat) => {
        const Icon = iconsMap[cat.toLowerCase()];
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`flex items-center gap-2 font-medium px-4 py-2 rounded-full shadow-sm transition transform duration-200 focus:outline-none focus:ring-2
              ${selected === cat
                ? "bg-blue-600 text-white"
                : "bg-sky-100 text-sky-700 hover:bg-sky-200 hover:scale-105 active:scale-100 focus:ring-sky-400"
              }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        );
      })}
    </div>
  );
}