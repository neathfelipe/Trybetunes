import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading';
import './login.css';

export default function Login() {
  const [user, setUser] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setUser(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await createUser({ name: user });
    setLoading(false);
    navigate('/search');
  };

  return (
    <div className="login">
      {loading && <Loading colors="#b9b9b9" />}
      {!loading && (
        <form className="form-login" onSubmit={ handleSubmit }>
          <img
            src="src/images/logo.svg"
            alt="logo"
          />
          <input
            data-testid="login-name-input"
            type="text"
            name="login"
            value={ user }
            onChange={ handleChange }
            placeholder="Digite seu nome"
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ user.length < 3 }
          >
            Entrar
          </button>
        </form>
      )}
    </div>
  );
}
