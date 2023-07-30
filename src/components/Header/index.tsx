import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import './header.css';

export default function Header() {
  const [user, setUser] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [imageProfile, setImageProfile] = useState<string>('');

  useEffect(() => {
    async function getUsername() {
      setLoading(true);
      const username = await getUser();
      setLoading(false);
      setUser(username.name);
      if (username.image !== '') {
        setImageProfile(username.image);
      }
    }
    getUsername();
  }, []);

  return (
    <header data-testid="header-component" className="header">
      <img className="logo-trybetunes" src="/src/images/logo.svg" alt="logo" />
      <div className="header-components">
        <nav>
          <NavLink data-testid="link-to-search" to="/search">
            <img src="/src/images/search-svgrepo-com.svg" alt="search" />
            Pesquisar
          </NavLink>
          <NavLink data-testid="link-to-favorites" to="/favorites">
            <img src="/src/images/favorites-svgrepo-com.svg" alt="favorites" />
            Favoritas
          </NavLink>
          <NavLink data-testid="link-to-profile" to="/profile">
            <img src="/src/images/profile-round-1342-svgrepo-com.svg" alt="profile" />
            Perfil
          </NavLink>
        </nav>
        <div className="profile-name-image">
          <img
            src={ imageProfile === '' ? 'src/images/user.png' : imageProfile }
            alt="profile"
          />
          {loading && <Loading colors="#3f3f3f" />}
          <p data-testid="header-user-name">
            {!loading && `Olá, ${user}`}
          </p>
        </div>
      </div>
    </header>
  );
}
