import React, { useState } from "react";
import axios from "axios";

const SearchFilter: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://zipatala.health.gov.mw/api/facilities=${query}`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      {loading ? <p>Loading...</p> : null}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFilter;
