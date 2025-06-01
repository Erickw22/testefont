import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/CriarPost.css";
import axios from 'axios';

// Base URL da API
const api = axios.create({
  baseURL: 'http://localhost:5000/posts'
});

function CriarPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token'); // pega token do localStorage

      if (!token) {
        setError('Você precisa estar logado para criar um post.');
        setLoading(false);
        return;
      }

      await api.post(
        '/',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`, // envia token no header
          },
        }
      );

      setTitle('');
      setContent('');
      navigate('/home'); // Redireciona para Home após criar post
    } catch (err) {
      console.error('Erro ao criar post:', err);
      setError('Erro ao criar post. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="criar-post-container">
      <h2>Criar Novo Post</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className="criar-post-form">
        <input
          className="input"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          aria-label="Título do post"
        />
        <textarea
          className="textarea"
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          aria-label="Conteúdo do post"
        />
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Post'}
        </button>
      </form>
    </div>
  );
}

export default CriarPost;
