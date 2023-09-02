import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event: any): void => {
    setName(event.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);
    await createUser({ name });
    setLoading(false);
    navigate('/search');
  };

  const isButtonDisabled = name.length < 3;

  return (
    <div>
      <form>
        <label>
          Nome:
          <input
            type="text"
            value={ name }
            onChange={ handleNameChange }
            data-testid="login-name-input"
          />
        </label>
        <button
          type="button"
          onClick={ handleLogin }
          disabled={ isButtonDisabled }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>
      {loading && <div>Carregando...</div>}
    </div>
  );
}

export default Login;
