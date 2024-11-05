// Importa os hooks useState e useEffect do React para gerenciar o estado e efeitos colaterais, respectivamente,
// e o módulo api para fazer solicitações HTTP.
import { useState, useEffect } from 'react'
import api from '../api'


// Importa o componente Link do react-router-dom para navegação entre rotas.
import { Link } from 'react-router-dom'

// Importa o arquivo de estilo CSS.
import '../styles/TopAjudantes.css'

// Define o componente PostList.
function TopAjudantes() {
  // Define o estado para armazenar a lista de posts.
  const [userProfile, setPixels] = useState([])


  // Efeito que é executado uma vez após a renderização inicial do componente.
  useEffect(() => {
    // Faz uma solicitação GET para a API para obter a lista de posts.
    api.get(`/userProfile/`)
      .then(response => {
        // Atualiza o estado com a lista de posts obtida da API.
        console.log('Resposta da API:', response.data)
        setPixels(response.data.results)
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error)
      })
  }, [])

  // Retorna a interface do componente PostList.
  return (
    <div className="post-list-container">
      {/* Cabeçalho da lista de posts com um botão para criar um novo post */}
      <div className="header">
        <h1 id='header'>Top Ajudantes</h1>
      </div>
      {/* Lista de posts */}
      <ul>
        {/* Mapeia cada post na lista de posts e renderiza um item de lista para cada um */}
        {userProfile.map(userProfile => (
          <li key={userProfile.id} className="post-item">
            {/* Link para os detalhes do post */}
            <Link to={`/userProfile/${userProfile.id}/detail`} className="post-link-name">{userProfile.fraseEfeito}</Link>
            {/* Botões de ação para editar e excluir o post */}
            {userProfile.upload && <img src={userProfile.upload} alt="Imagem do Usurário" className="post-image" />}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Exporta o componente PostList.
export default TopAjudantes