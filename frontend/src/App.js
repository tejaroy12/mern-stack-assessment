import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAllProducts, fetchFilteredProducts } from "./api/FetchProducts";
import "./App.css";

import FilterPanel from "./components/FilterPanel";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProductCard from "./components/ProductCard";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("none");
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sortProducts = (items, option) => {
    if (option === "price-asc") return [...items].sort((a, b) => a.price - b.price);
    if (option === "price-desc") return [...items].sort((a, b) => b.price - a.price);
    return items;
  };

  useEffect(() => {
    (async () => {
      const all = await fetchAllProducts();
      const unique = [...new Set(all.map((p) => p.category))];
      setCategories(unique);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const list = await fetchFilteredProducts(searchTerm, categoryFilter);
      setProducts(sortProducts(list, sortOption));
      setIsLoading(false);
      setIsFilterOpen(false);
    })();
  }, [searchTerm, categoryFilter, sortOption]);

  return (
    <div className="app-wrapper">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={setSearchTerm} />

      <main className="container">
        <HeroSection />

        <div className="content-grid">
          <FilterPanel
            categories={categories}
            categoryFilter={categoryFilter}
            handleFilterChange={(e) => setCategoryFilter(e.target.value)}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            sortOption={sortOption}
            handleSortChange={(e) => setSortOption(e.target.value)}
          />

          <div className="products-section">
            <h2 className="section-title">
              {categoryFilter === "All" ? "All Products" : categoryFilter}
              {searchTerm && <span className="search-tag">({searchTerm})</span>}
            </h2>

            {isLoading ? (
              <p className="loading">Loading...</p>
            ) : products.length > 0 ? (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <Search size={40} className="text-muted" />
                <p>No products found.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
