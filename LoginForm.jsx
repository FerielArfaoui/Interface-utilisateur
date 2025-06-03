import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dashboards, setDashboards] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    console.log(email, password);
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      alert(response.data.message);
      setDashboards(response.data.dashboards);
    } catch (err) {
      setError('Erreur : Identifiants invalides');
      setDashboards([]);
    }
  };

  return (
    <div>
      <h2>Connexion Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Emailtt"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Connexion</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {dashboards.length > 0 && (
        <div>
          <h3>Dashboards disponibles :</h3>
          <ul>
            {dashboards.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
