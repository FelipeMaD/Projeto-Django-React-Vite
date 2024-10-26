// Importa os hooks useState e useEffect do React para gerenciar o estado e efeitos colaterais, respectivamente, 
// e os hooks useNavigate e useParams do react-router-dom para navegação entre rotas e obtenção de parâmetros da URL.
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

// Importa o módulo api para fazer solicitações HTTP.
import api from '../api'

// Importa o arquivo de estilo CSS.
import '../styles/EditPost.css'

// Define o componente EditPost.
function EditPost() {
  // Obtém o parâmetro postId da URL.
  const { postId } = useParams()
  
  // Obtém a função de navegação do hook useNavigate.
  const navigate = useNavigate()
  
  // Define estados para o título, conteúdo, imagem e imagem atual do post.
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [currentImage, setCurrentImage] = useState('')

  // Efeito que é executado quando o postId é alterado.
  useEffect(() => {
    // Se postId não existe, retorna.
    if (!postId) return

    // Obtém os detalhes do post da API com base no postId.
    api.get(`/posts/${postId}/`)
      .then(response => {
        // Atualiza o estado com os detalhes do post.
        setTitle(response.data.title)
        setContent(response.data.content)
        setImage(response.data.image)
        setCurrentImage(response.data.image)
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do post:', error)
      })
  }, [postId])

  // Função para lidar com a mudança de imagem.
  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  // Função para lidar com o envio do formulário de edição/criação do post.
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Cria um objeto FormData para enviar os dados do formulário.
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      
      // Se uma nova imagem foi selecionada e é diferente da imagem atual, adiciona a nova imagem ao FormData.
      if (image && image !== currentImage) {
        formData.append('image', image)
      }

      // Verifica se o postId existe para determinar se é uma edição ou criação de post.
      if (postId) {
        // Se postId existe, faz uma solicitação PUT para atualizar o post existente.
        await api.put(`/posts/${postId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        alert('Post atualizado com sucesso!')
      } else {
        // Se postId não existe, faz uma solicitação POST para criar um novo post.
        await api.post(`/posts/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }
      // Redireciona para a página de listagem de posts após o sucesso da operação.
      navigate('/posts')
    } catch (error) {
      console.error('Erro ao salvar post:', error)
    }
  }

  // Retorna a interface do componente EditPost.
  return (
    <div className="edit-post-container">
      {/* Título dinâmico com base na existência do postId. */}
      <h1>{postId ? 'Editar Post' : 'Criar Novo Post'}</h1>
      {/* Formulário de edição/criação do post. */}
      <form onSubmit={handleSubmit}>
        <div>
          {/* Exibe a imagem atual do post, se existir. */}
          {currentImage && <img src={currentImage} alt="Imagem do Post" className="post-image" />}
          {/* Input para selecionar uma nova imagem. */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {/* Inputs para inserir título e conteúdo do post. */}
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Conteúdo" value={content} onChange={(e) => setContent(e.target.value)} />
        {/* Botão para salvar o post (editar ou criar). */}
        <button className="save-button" type="submit">{postId ? 'Salvar' : 'Criar'}</button>
        {/* Link para voltar para a listagem de posts. */}
        <Link to="/pixels" >
          <button type="button" className="back-button">Voltar para Listagem</button>
        </Link>
      </form>
    </div>
  )
}

// Exporta o componente EditPost.
export default EditPost