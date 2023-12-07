import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleInputChange}
      placeholder="Search by name or category..."
      className="w-1/2 px-4 py-2 mt-4 border rounded-full shadow-sm form-input focus:outline-none focus:border-gray-400"
    />
  );
};

export default SearchBar;
