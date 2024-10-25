// Importa o hook useState do React para gerenciar o estado e o hook useNavigate do react-router-dom para navegação entre rotas
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

// Importa o arquivo de estilo CSS
import '../styles/Login.css'

// Define o componente Login
function Login() {
  // Define estados para o nome de usuário e senha
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Obtém a função de navegação do hook useNavigate
  const navigate = useNavigate()

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Faz uma solicitação POST para a API para obter o token de acesso
      const response = await api.post(`/token/`, { username, password })
      // Armazena o token de acesso no localStorage
      localStorage.setItem('token', response.data.access)
      // Redireciona para a página de listagem de posts após o login bem-sucedido
      navigate('/pixels/')
    } catch (error) {
      // Registra qualquer erro ocorrido ao fazer login
      console.error('Erro ao fazer login:', error)
    }
  }

  // Retorna a interface do componente Login
  return (
    <div className="login-container"> {/* Adiciona uma classe ao contêiner */}
      <h1>Login</h1>
      {/* Formulário de login */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        {/* Botão de login */}
        <button type="submit" className="login-button">Entrar</button> {/* Adiciona uma classe ao botão */}
      </form>
    </div>
  )
}

// Exporta o componente Login
export default Login