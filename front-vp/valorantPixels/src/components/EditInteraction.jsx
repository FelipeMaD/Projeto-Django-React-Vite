// Importa os hooks useState e useEffect do React para gerenciar o estado e efeitos colaterais, respectivamente, 
// e os hooks useNavigate e useParams do react-router-dom para navegação entre rotas e obtenção de parâmetros da URL.
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom'
import '../styles/Home.css'
import logo from '../assets/logo.png'

// Importa o módulo api para fazer solicitações HTTP.
import api from '../api'

// Importa o arquivo de estilo CSS.
import '../styles/EditInteraction.css'

// Define o componente EditPost.
function EditInteraction() {
  // Obtém o parâmetro postId da URL.
  const { interactionId } = useParams()
  
  // Obtém a função de navegação do hook useNavigate.
  const navigate = useNavigate()

  const location = useLocation()
  
  // Define estados para o título, conteúdo, imagem e imagem atual do post.
  const pixelId = new URLSearchParams(location.search).get('pixelPost')
  const [pixelPost, setPixelPost] = useState(pixelId || '')
  const [comentario, setComentario] = useState('')
  const [upload, setImage] = useState('')
  const [currentImage, setCurrentImage] = useState('')
  // const [pixelPost, setCurrentPost] = useState('')

  // Efeito que é executado quando o postId é alterado.
  useEffect(() => {
    // Se postId não existe, retorna.
    if (!interactionId) return

    // Obtém os detalhes do post da API com base no postId.
    api.get(`/interaction/${interactionId}/`)
      .then(response => {
        // Atualiza o estado com os detalhes do post.
        setComentario(response.data.comentario)
        setImage(response.data.upload)
        setCurrentPost(response.data.pixelPost)
        setCurrentImage(response.data.currentImage)
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes da interação:', error)
      })
  }, [interactionId])

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
      formData.append('comentario', comentario)
      formData.append('pixelPost', pixelPost)  
      
      // Se uma nova imagem foi selecionada e é diferente da imagem atual, adiciona a nova imagem ao FormData.
      if (upload && upload !== currentImage) {
        formData.append('upload', upload)
      }

      // Verifica se o postId existe para determinar se é uma edição ou criação de post.
      if (interactionId) {
        // Se postId existe, faz uma solicitação PUT para atualizar o post existente.
        await api.put(`/interaction/${interactionId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        alert('Sua interação foi atualizada com sucesso!')
      } else {
        // Se postId não existe, faz uma solicitação POST para criar um novo post.
        await api.post(`/interaction/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }
      // Redireciona para a página de listagem de posts após o sucesso da operação.
      navigate(`/pixels/${pixelPost}/detail`)
    } catch (error) {
      console.error('Erro ao salvar interação:', error)
    }
  }

  // Retorna a interface do componente EditPost.
  return (
    <div className='master-div'>
      <header className='header'>
        <div className='left-header'>
            <Link to="/Home" className='home'><img src={logo} alt="" className='imagem' /></Link>
            <Link to="/Home" className='home'>Home</Link>
            <a href="#"><p>Sobre nós</p></a>
        </div>
        <div className='right-header'>
            <a href="#"><p>Suporte</p></a>
        </div>
      </header>
      <nav className='navbar'>
        <div className='links-navbar'>
            <Link to="#" className='links-escolha'>agentes</Link>
            <Link to="#" className='links-escolha'>mapas</Link>
            <Link to="/userProfile" className='links-escolha'>top ajudantes</Link>
            <Link to="#" className='links-escolha'>comunidade</Link>
        </div>
        <div>
            <Link to="#">Hi, joao</Link>
        </div>
      </nav>


      <div className="edit-post-container">
        {/* Título dinâmico com base na existência do postId. */}
        <h1>{interactionId ? 'Editar Interacao' : 'Criar Nova Interacao'}</h1>

        {/* Formulário de edição/criação do post. */}
        <div id='main-box'>

        <form onSubmit={handleSubmit}>

         <div className='inputs-div'>
          <h3 className='h3-inputs'>Comentário</h3>
          <textarea placeholder="Comentario" value={comentario} onChange={(e) => setComentario(e.target.value)} id='input-descricao'/>
         </div>
         
         
         
          <div>
            {/* Exibe a imagem atual do post, se existir. */}
            {currentImage && <img src={currentImage} alt="Imagem do comentario" className="post-image" />}

            <div className='inputs-div'>
            {/* Input para selecionar uma nova imagem. */}
            <h3>Foto/Videos:</h3>
            <input type="file" accept="upload/*" onChange={handleImageChange} id="file-upload-button" />
            <label htmlFor="file-upload-button" className="file-upload-label">Escolher Arquivo</label>
            </div>
          </div>






      
          {/* Botão para salvar o post (editar ou criar). */}
          <button className="save-button" type="submit">{interactionId ? 'Salvar' : 'Criar'}</button>
          {/* Link para voltar para a listagem de posts. */}
          <Link to={`/pixels/${pixelPost.id}/detail`} >
            <button type="button" className="back-button">Voltar para Publicações</button>
          </Link>
        </form>
      </div>
    </div>
        </div>
  )
}

// Exporta o componente EditPost.
export default EditInteraction