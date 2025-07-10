
import './RepositoryCard.css'; 

const RepositoryCard = ({ repo }) => {
  return (
    <div className="repo-card">
      <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-name">
        {repo.name}
      </a>
      <p className="repo-description">{repo.description || 'No description'}</p>
      <p className="repo-stars">⭐ {repo.stargazers_count}</p>
    </div>
  );
};

export default RepositoryCard;
