import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiHome, FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import '../styles/Perfil.css';

const Perfil = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Usuário não autenticado.');
          setLoading(false);
          return;
        }

        // Requisição com o token no header Authorization
        const res = await axios.get('http://localhost:5000/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Atualiza dados do usuário no estado
        setUserData({
          firstName: res.data.firstName,
          email: res.data.email,
        });

      } catch (err) {
        // Exibe mensagem de erro no estado
        setError('Erro ao carregar dados do usuário.');
        console.error('Erro ao buscar perfil:', err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Logout remove token e redireciona para login
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Navega para a home
  const handleGoHome = () => {
    navigate('/home');
  };

  // Mostrar loading enquanto busca dados do usuário
  if (loading) {
    return <div className="profile-container">Carregando...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Perfil</h1>

        {error ? (
          <div className="feedback-message error-message" role="alert">
            {error}
          </div>
        ) : (
          <div className="profile-info">
            <p>
              <FiUser aria-hidden="true" /> <strong>Nome:</strong> {userData.firstName}
            </p>
            <p>
              <FiMail aria-hidden="true" /> <strong>Email:</strong> {userData.email}
            </p>
          </div>
        )}

        <div className="profile-buttons">
          <button onClick={handleGoHome} className="profile-button" aria-label="Voltar para a página inicial">
            <FiHome aria-hidden="true" /> Voltar para Home
          </button>
          <button onClick={handleLogout} className="profile-button logout-button" aria-label="Sair da conta">
            <FiLogOut aria-hidden="true" /> Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
