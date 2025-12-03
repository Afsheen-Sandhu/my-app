import React from "react";
import { Dropdown } from "@/components/ui/dropdown";

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

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  priceSort,
  onPriceSortChange,
}) => {
  return (
    <aside className="bg-base-100 text-base-content rounded-xl shadow-md p-5 w-full md:w-[260px] flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Filters</h2>
      <Dropdown label={getPriceSortLabel(priceSort)}>
        {({ close }) => (
          <div className="flex flex-col py-1">
            <button
              type="button"
              className={`text-left px-4 py-2 text-sm rounded transition-colors ${priceSort === "low-to-high" ? "bg-primary text-primary-foreground" : "hover:bg-base-200"}`}
              onClick={() => {
                onPriceSortChange("low-to-high");
                close();
              }}
            >
              Low to High
            </button>
            <button
              type="button"
              className={`text-left px-4 py-2 text-sm rounded transition-colors ${priceSort === "high-to-low" ? "bg-primary text-primary-foreground" : "hover:bg-base-200"}`}
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
