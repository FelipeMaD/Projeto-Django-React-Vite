// Este código define um componente chamado AppRouter que representa as rotas da aplicação. Ele utiliza o Router do React Router para envolver a aplicação e fornecer a navegação baseada em rotas. As rotas são definidas dentro do componente Routes.

// Importa os componentes necessários do react-router-dom e os componentes da aplicação
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PixelList from './components/PixelList'
import CreatePixel from './components/EditPixel'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import EditPixel from './components/EditPixel'
import ReadPixel from './components/ReadPixel'
import Home from './components/Home'
import ReadInteraction from './components/readInteraction.jsx'
import TopAjudantes from './components/TopAjudantes.jsx'

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
          <Route path="/Home" element={<Home/>}/>
          {/* Rota para a listagem de posts */}
          <Route path="/pixels" element={<PixelList />} />
          {/* Rota para criar um novo post */}
          <Route path="/pixels/create" element={<CreatePixel />} />
          {/* Rota para editar um post existente */}
          <Route path="/pixels/:pixelId/edit" element={<EditPixel />} />
          {/* Rota para visualizar os detalhes de um post */}
          <Route path="/pixels/:pixelId/detail" element={<ReadPixel />} />

          <Route path="/interaction/:interactionId/detail" element={<ReadInteraction />} />

          {/* Rota para a lista de top ajudantes */}
          <Route path="/userProfile" element={<TopAjudantes />} />
        </Route>
      </Routes>
    </Router>
  )
}

// Exporta o componente AppRouter
export default AppRouter