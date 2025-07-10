
import './UserProfile.css'; 

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <img src={user.avatar_url} alt={user.name} className="avatar" />
      <h2>{user.name}</h2>
      <p className="bio">{user.bio || 'No bio available'}</p>
      <p><strong>Location:</strong> {user.location || 'Not specified'}</p>
      <p><strong>Followers:</strong> {user.followers}</p>
    </div>
  );
};

export default UserProfile;
