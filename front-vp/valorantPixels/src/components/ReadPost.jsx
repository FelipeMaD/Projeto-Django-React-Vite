// Importa os hooks useState e useEffect do React para gerenciar o estado e efeitos colaterais, respectivamente,
// o hook useParams do react-router-dom para obter parâmetros da URL,
// e o módulo api para fazer solicitações HTTP.
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'

// Importa o arquivo de estilo CSS.
import '../styles/ReadPost.css'

// Define o componente ReadPost.
function ReadPost() {
  // Obtém o parâmetro postId da URL.
  const { postId } = useParams()

  // Define estados para armazenar o título, conteúdo e imagem do post.
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')

  // Efeito que é executado quando o postId é alterado.
  useEffect(() => {
    // Faz uma solicitação GET para a API para obter os detalhes do post com o ID fornecido.
    api.get(`/posts/${postId}/`)
      .then(response => {
        // Atualiza o estado com os detalhes do post obtidos da API.
        setTitle(response.data.title)
        setContent(response.data.content)
        setImage(response.data.image)
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do post:', error)
      })
  }, [postId])

  // Retorna a interface do componente ReadPost.
  return (
    <div className="read-post-container">
      {/* Título da página */}
      <h1>Detalhes do Post</h1>
      {/* Link para voltar para a lista de posts */}
      <Link to="/posts" >
        <button type="button" className="back-button">Voltar para Listagem</button>
      </Link>
      {/* Título do post */}
      <h2>{title}</h2>
      {/* Conteúdo do post */}
      <p>{content}</p>
      {/* Imagem do post, se existir */}
      {image && <img src={image} alt="Imagem do Post" className="post-image" />}
    </div>
  )
}

// Exporta o componente ReadPost.
export default ReadPost