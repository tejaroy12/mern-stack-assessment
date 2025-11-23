import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import "./Header.css";

const fetchSuggestions = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 150));
  if (!query) return [];

  try {
    const res = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.from(new Set(data.map(p => p.name))).slice(0, 5);
  } catch (err) {
    console.error("Suggestion fetch error", err);
    return [];
  }
};

const Header = ({ searchTerm, setSearchTerm, onSearch }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(async () => {
      setIsTyping(true);
      const fetched = await fetchSuggestions(searchTerm);
      setSuggestions(fetched);
      setIsTyping(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <header className="header-container shadow-sm">
      <div className="header-inner">
        <h1 className="logo">E-Shop</h1>

        <div className="search-wrapper">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch(searchTerm)}
            />
            <button onClick={() => onSearch(searchTerm)} className="search-btn">
              <Search size={20} />
            </button>
          </div>

          {suggestions.length > 0 && (
            <div className="suggestions-box">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="suggestion-item"
                  onClick={() => { setSearchTerm(s); onSearch(s); }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}

          {searchTerm && isTyping && suggestions.length === 0 && (
            <div className="suggestions-box">
              <div className="suggestion-item muted">Searching...</div>
            </div>
          )}
        </div>

        <button className="signin-btn d-none d-md-block">Sign In</button>
      </div>
    </header>
  );
};

export default Header;
