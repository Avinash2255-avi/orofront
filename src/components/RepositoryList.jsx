import { useState } from 'react';
import RepositoryCard from './RepositoryCard';
import './RepositoryList.css';

const RepositoryList = ({ repos }) => {
  const reposPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(repos.length / reposPerPage);
  const startIndex = (currentPage - 1) * reposPerPage;
  const currentRepos = repos.slice(startIndex, startIndex + reposPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="repo-section">
      <h2 className="repo-title">Top Repositories</h2>

      <div className="repo-grid">
        {currentRepos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={handlePrev} disabled={currentPage === 1} className="pagination-button">
            ← Prev
          </button>

          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>

          <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination-button">
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default RepositoryList;
