//Este código define um componente chamado PrivateRoute, que é utilizado para proteger rotas que requerem autenticação. A função isAuthenticated verifica se o usuário está autenticado verificando se há um token no localStorage. Se o usuário estiver autenticado, o componente renderiza o Outlet, que representa o conteúdo das rotas aninhadas. Caso contrário, o componente redireciona o usuário para a página inicial (<Navigate to="/" />). Este componente pode ser usado para envolver rotas que devem ser acessadas apenas por usuários autenticados.

// Importa o componente Navigate e Outlet do react-router-dom
import { Navigate, Outlet } from 'react-router-dom'

// Define o componente PrivateRoute
const PrivateRoute = () => {
  // Função para verificar se o usuário está autenticado
  function isAuthenticated() {
    // Obtém o token do localStorage
    const token = localStorage.getItem('token');
    // Verifica se o token existe e se não está expirado
    return token ? true : false;
  }

  // Se autenticado, renderiza o Outlet (conteúdo das rotas aninhadas)
  // Se não, redireciona para a página de login
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />
}

// Exporta o componente PrivateRoute
export default PrivateRoute