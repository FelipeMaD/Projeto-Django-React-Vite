// Importa os hooks useState e useEffect do React para gerenciar o estado e efeitos colaterais, respectivamente,
// e o módulo api para fazer solicitações HTTP.
import { useState, useEffect } from 'react'
import api from '../api'
import { API_URL } from '../../config' 

// Importa o componente Link do react-router-dom para navegação entre rotas.
import { Link } from 'react-router-dom'

// Importa o arquivo de estilo CSS.
import '../styles/PostList.css'

// Define o componente PostList.
function PixelList() {
  // Define o estado para armazenar a lista de posts.
  const [pixels, setPixels] = useState([])

  // Função para lidar com a exclusão de um post.
  const handleDelete = async (pixelId) => {
    try {
      // Faz uma solicitação DELETE para a API para excluir o post com o ID fornecido.
      await api.delete(`/pixels/${pixelId}/`)
      // Atualiza o estado removendo o post excluído da lista.
      const updatedPixels = pixels.filter(pixel => pixel.id !== pixelId)
      setPixels(updatedPixels)
      alert('Seu pixel foi deletado com sucesso!')
    } catch (error) {
      console.error('Erro ao deletar pixel:', error)
    }
  }

  // Efeito que é executado uma vez após a renderização inicial do componente.
  useEffect(() => {
    // Faz uma solicitação GET para a API para obter a lista de posts.
    api.get(`/pixels/`)
      .then(response => {
        // Atualiza o estado com a lista de posts obtida da API.
        console.log('Resposta da API:', response.data)
        setPixels(response.data.results)
      })
      .catch(error => {
        console.error('Erro ao buscar Pixels:', error)
      })
  }, [])

  // Retorna a interface do componente PostList.
  return (
    <div className="post-list-container">
      {/* Cabeçalho da lista de posts com um botão para criar um novo post */}
      <div className="header">
        <h1>Lista de Pixels</h1>
        <Link to="/pixels/create" className="create-button">Criar Novo Pixel</Link> {/* Adiciona um link para criar um novo post */}
      </div>
      {/* Lista de posts */}
      <ul>
        {/* Mapeia cada post na lista de posts e renderiza um item de lista para cada um */}
        {pixels.map(pixel => (
          <li key={pixel.id} className="post-item">
            {/* Link para os detalhes do post */}
            <Link to={`/pixels/${pixel.id}/detail`} className="post-link-name">{pixel.titulo}</Link>
            {/* Botões de ação para editar e excluir o post */}
            <div className="actions">
              <Link to={`/pixels/${pixel.id}/edit`} className="post-link">Editar</Link>
              <button onClick={() => handleDelete(pixel.id)} className="delete-button">Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Exporta o componente PostList.
export default PixelList