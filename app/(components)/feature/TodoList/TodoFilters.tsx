import React from "react";
import { FilterType } from "../../type";

interface Props {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  className?: string;
}

const TodoFilters: React.FC<Props> = ({
  currentFilter,
  onFilterChange,
  className = "",
}) => {
  const filters: FilterType[] = ["all", "active", "completed"];

  return (
    <div className={`flex justify-center gap-4 font-bold ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`capitalize transition-colors hover:text-brand active:text-txt-main ${
            currentFilter === filter ? "text-brand" : "text-txt-muted"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default TodoFilters;
