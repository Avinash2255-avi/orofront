import { useState, useEffect, useCallback } from 'react';
import './styles/App.css';

import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepositoryList from './components/RepositoryList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 5;

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const fetchGitHubInfo = useCallback(async (username) => {
    if (!username) return;

    setLoading(true);
    setError('');
    setUserData(null);
    setRepos([]);
    setCurrentPage(1); 

    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    };

    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
      if (!userResponse.ok) throw new Error('User not found or API limit reached');
      const user = await userResponse.json();

      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
      const reposData = await reposResponse.json();

      const sortedRepos = reposData.sort((a, b) => b.stargazers_count - a.stargazers_count);

      setUserData(user);
      setRepos(sortedRepos);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  const totalPages = Math.ceil(repos.length / reposPerPage);
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <h1 className="title">GitHub User Search</h1>

      <button onClick={() => setDarkMode(!darkMode)} className="dark-toggle-button">
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>

      <SearchBar onSearch={fetchGitHubInfo} />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {userData && <UserProfile user={userData} />}

      {currentRepos.length > 0 && (
        <>
          <RepositoryList repos={currentRepos} />

          <div className="pagination-controls">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              ⬅ Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
