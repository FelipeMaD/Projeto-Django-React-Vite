// Este código define um componente chamado AppRouter que representa as rotas da aplicação. Ele utiliza o Router do React Router para envolver a aplicação e fornecer a navegação baseada em rotas. As rotas são definidas dentro do componente Routes.

// Importa os componentes necessários do react-router-dom e os componentes da aplicação
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PostList from './components/PostList'
import CreatePost from './components/EditPost'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import EditPost from './components/EditPost'
import ReadPost from './components/ReadPost'

// Define o componente AppRouter que contém as rotas da aplicação
function AppRouter() {
  return (
    // Define o componente Router para envolver a aplicação e fornecer navegação baseada em rotas
    <Router>
      {/* Define as rotas da aplicação */}
      <Routes>
        {/* Rota para a página de login (pública) */}
        <Route path="/" element={<Login />} />
        {/* Rotas protegidas que requerem autenticação */}
        <Route element={<PrivateRoute />}>
          {/* Rota para a listagem de posts */}
          <Route path="/pixels" element={<PostList />} />
          {/* Rota para criar um novo post */}
          <Route path="/pixels/create" element={<CreatePost />} />
          {/* Rota para editar um post existente */}
          <Route path="/pixels/:pixelId/edit" element={<EditPost />} />
          {/* Rota para visualizar os detalhes de um post */}
          <Route path="/pixels/:pixelId/detail" element={<ReadPost />} />
        </Route>
      </Routes>
    </Router>
  )
}

// Exporta o componente AppRouter
export default AppRouter