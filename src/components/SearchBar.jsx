import { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState('');
  const [debouncedUsername, setDebouncedUsername] = useState('');

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUsername(username.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [username]);

  useEffect(() => {
    if (debouncedUsername) {
      onSearch(debouncedUsername);
    }
  }, [debouncedUsername,onSearch]);

  return (
    <div className="search-form">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
