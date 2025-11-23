import { ChevronDown } from "lucide-react";
import "./FilterPanel.css";

const FilterPanel = ({
  categories,
  categoryFilter,
  handleFilterChange,
  isFilterOpen,
  setIsFilterOpen,
  sortOption,
  handleSortChange
}) => {
  const ALL = ["All", ...categories];

  return (
    <aside className="filter-panel">
      <div className="filter-header" onClick={() => setIsFilterOpen(!isFilterOpen)}>
        Filters <ChevronDown size={18} />
      </div>

      <div className={`filter-body ${isFilterOpen ? "open" : ""}`}>
        <label>Category</label>
        <select value={categoryFilter} onChange={handleFilterChange}>
          {ALL.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <label>Sort by Price</label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="none">Default</option>
          <option value="price-asc">Low → High</option>
          <option value="price-desc">High → Low</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterPanel;
