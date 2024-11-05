// Importa os hooks useState e useEffect do React para gerenciar o estado e efeitos colaterais, respectivamente,
// e o módulo api para fazer solicitações HTTP.
import { useState, useEffect } from 'react'
import api from '../api'



// Importa o componente Link do react-router-dom para navegação entre rotas.
import { Link } from 'react-router-dom'

// Importa o arquivo de estilo CSS.
import '../styles/interactions.css'


// Define o componente PostList.
function InteractionList({ pixelId }) {
  // Define o estado para armazenar a lista de posts.
  const [interactions, setInteractions] = useState([])

  // Função para lidar com a exclusão de um post.
  const handleDelete = async (interactionId) => {
    try {
      // Faz uma solicitação DELETE para a API para excluir o post com o ID fornecido.
      await api.delete(`/interaction/${interactionId}/`)
      // Atualiza o estado removendo o post excluído da lista.
      const updatedInteractions = interactions.filter(interaction => interaction.id !== interactionId)
      setPixels(updatedInteractions)
      alert('Sua Interação foi deletada com sucesso!')
    } catch (error) {
      console.error('Erro ao deletar interação:', error)
    }
  }

  // Efeito que é executado uma vez após a renderização inicial do componente.
  useEffect(() => {
    // Faz uma solicitação GET para a API para obter a lista de posts.
    api.get(`/interaction/?pixelPost=${pixelId}`)
      .then(response => {
        // Atualiza o estado com a lista de posts obtida da API.
        console.log('Resposta da API:', response.data)
        setInteractions(response.data.results)
      })
      .catch(error => {
        console.error('Erro ao buscar interações:', error)
      })
  }, [pixelId])

  // Retorna a interface do componente PostList.
  return (
    <div>
        <div className="interaction-list">
        {/* Cabeçalho da lista de posts com um botão para criar um novo post */}
        <div className="header">
            <h1>Comentários</h1>
            {/* <Link to="/pixels/create" className="create-button">Criar Novo Pixel</Link> Adiciona um link para criar um novo post */}
        </div>
        {/* Lista de posts */}
        <ul>
            {/* Mapeia cada post na lista de posts e renderiza um item de lista para cada um */}
            {interactions.map(interaction => (
            <li key={interaction.id} className="interaction-item">
                {/* Link para os detalhes do post */}
                <div className='fake-img'></div>
                <Link to={`/interaction/${interaction.id}/detail`} className="interaction-link-name">
                  <p>{interaction.comentario}</p>
                </Link>
                {/* Botões de ação para editar e excluir o post */}
                {/* <div className="actions">
                <Link to={`/pixels/${pixel.id}/edit`} className="post-link">Editar</Link>
                <button onClick={() => handleDelete(pixel.id)} className="delete-button">Deletar</button>
                </div> */}
            </li>
            ))}
        </ul>
        </div>
    </div>
  )
}

// Exporta o componente PostList.
export default InteractionList