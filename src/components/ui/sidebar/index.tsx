import React from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";

export type PriceSort = "low-to-high" | "high-to-low" | null;

export interface FiltersSidebarProps {
  priceSort: PriceSort;
  onPriceSortChange: (value: PriceSort) => void;
}

function getPriceSortLabel(sort: PriceSort) {
  if (sort === "low-to-high") return "Low to High";
  if (sort === "high-to-low") return "High to Low";
  return "Filter by Price";
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ priceSort, onPriceSortChange }) => {
  return (
    <aside className="bg-white rounded-xl shadow-md p-6 min-w-[220px] w-full max-w-xs flex flex-col gap-6">
      <Dropdown label={getPriceSortLabel(priceSort)}>
        {({ close }) => (
          <div className="flex flex-col">
            <button
              type="button"
              className={`text-left px-4 py-2 text-sm rounded transition-colors ${priceSort === "low-to-high" ? "bg-primary text-white" : "hover:bg-muted"}`}
              onClick={() => {
                onPriceSortChange("low-to-high");
                close();
              }}
            >
              Low to High
            </button>
            <button
              type="button"
              className={`text-left px-4 py-2 text-sm rounded transition-colors ${priceSort === "high-to-low" ? "bg-primary text-white" : "hover:bg-muted"}`}
              onClick={() => {
                onPriceSortChange("high-to-low");
                close();
              }}
            >
              High to Low
            </button>
          </div>
        )}
      </Dropdown>
    </aside>
  );
};
