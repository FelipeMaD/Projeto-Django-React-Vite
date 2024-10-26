// Importa os hooks useState e useEffect do React para gerenciar o estado e efeitos colaterais, respectivamente,
// o hook useParams do react-router-dom para obter parâmetros da URL,
// e o módulo api para fazer solicitações HTTP.
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'

// Importa o arquivo de estilo CSS.
import '../styles/ReadPost.css'

// Define o componente ReadPost.
function ReadPixel() {
  // Obtém o parâmetro postId da URL.
  const { pixelId } = useParams()

  // Define estados para armazenar o título, conteúdo e imagem do post.
  const [titulo, setTitle] = useState('')
  const [descricao, setContent] = useState('')
  const [upload, setImage] = useState('')

  // Efeito que é executado quando o postId é alterado.
  useEffect(() => {
    // Faz uma solicitação GET para a API para obter os detalhes do post com o ID fornecido.
    api.get(`/pixels/${pixelId}/`)
      .then(response => {
        // Atualiza o estado com os detalhes do post obtidos da API.
        setTitle(response.data.titulo)
        setContent(response.data.descricao)
        setImage(response.data.upload)
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do pixel:', error)
      })
  }, [pixelId])

  // Retorna a interface do componente ReadPost.
  return (
    <div className="read-post-container">
      {/* Título da página */}
      <h1>Detalhes do Pixel</h1>
      {/* Link para voltar para a lista de posts */}
      <Link to="/pixels" >
        <button type="button" className="back-button">Voltar para Listagem</button>
      </Link>
      {/* Título do post */}
      <h2>{titulo}</h2>
      {/* Conteúdo do post */}
      <p>{descricao}</p>
      {/* Imagem do post, se existir */}
      {upload && <img src={upload} alt="Imagem do Pixel" className="post-image" />}
    </div>
  )
}

// Exporta o componente ReadPost.
export default ReadPixel