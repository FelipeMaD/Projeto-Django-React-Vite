// Importa os hooks useState e useEffect do React para gerenciar o estado e efeitos colaterais, respectivamente, 
// e os hooks useNavigate e useParams do react-router-dom para navegação entre rotas e obtenção de parâmetros da URL.
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import '../styles/Home.css'
import logo from '../assets/logo.png'

// Importa o módulo api para fazer solicitações HTTP.
import api from '../api'

// Importa o arquivo de estilo CSS.
import '../styles/EditAjudantes.css'

// Define o componente EditPost.
function EditAjudante() {
  // Obtém o parâmetro postId da URL.
  const { userProfileId } = useParams()
  
  // Obtém a função de navegação do hook useNavigate.
  const navigate = useNavigate()
  
  // Define estados para o título, conteúdo, imagem e imagem atual do post.
  const [fraseEfeito, setFrase] = useState('')
  const [profile_picture, setImage] = useState('')
  const [currentImage, setCurrentImage] = useState('')

  // Efeito que é executado quando o postId é alterado.
  useEffect(() => {
    // Se postId não existe, retorna.
    if (!userProfileId) return

    // Obtém os detalhes do post da API com base no postId.
    api.get(`/userProfile/${userProfileId}/`)
      .then(response => {
        // Atualiza o estado com os detalhes do post.
        setFrase(response.data.fraseEfeito)
        setImage(response.data.profile_picture)
        setCurrentImage(response.data.profile_picture)
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do ajudante: ', error)
      })
  }, [userProfileId])

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
      formData.append('fraseEfeito', fraseEfeito)
      
      // Se uma nova imagem foi selecionada e é diferente da imagem atual, adiciona a nova imagem ao FormData.
      if (profile_picture && profile_picture !== currentImage) {
        formData.append('profile_picture', profile_picture)
      }

      // Verifica se o postId existe para determinar se é uma edição ou criação de post.
      if (userProfileId) {
        // Se postId existe, faz uma solicitação PUT para atualizar o post existente.
        await api.put(`/userProfile/${userProfileId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        alert('Seu ajudante foi atualizado com sucesso!')
      } else {
        // Se postId não existe, faz uma solicitação POST para criar um novo post.
        await api.post(`/userProfile/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }
      // Redireciona para a página de listagem de posts após o sucesso da operação.
      navigate('/userProfile/')
    } catch (error) {
      console.error('Erro ao salvar ajudante', error)
    }
  }

  // Retorna a interface do componente 
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
            <Link to = "/pixels/" className='links-escolha'>comunidade</Link>
        </div>
        <div>
            <Link to="#">Hi, joao</Link>
        </div>
      </nav>


      <div className="edit-post-container">
        {/* Título dinâmico com base na existência do postId. */}
        <h1>{userProfileId ? 'Editar Ajudante' : 'Criar Novo Ajudante'}</h1>

        {/* Formulário de edição/criação do post. */}
        <div id='main-box'>

        <form onSubmit={handleSubmit}>

          <div className='inputs-div'>
            <h3 className='h3-inputs'>Frase do ajudante</h3>
            {/* Inputs para inserir título e conteúdo do post. */}
            <input type="text" placeholder="Título" value={fraseEfeito} onChange={(e) => setFrase(e.target.value)} id='input-titulo'/>
          </div> 
         
          <div>
            {/* Exibe a imagem atual do post, se existir. */}
            {currentImage && <img src={currentImage}  className="post-image" />}

            <div className='inputs-div'>
            {/* Input para selecionar uma nova imagem. */}
            <h3>Foto/Videos:</h3>
            <input type="file" accept="upload/*" onChange={handleImageChange} id="file-upload-button" />
            <label htmlFor="file-upload-button" className="file-upload-label">Escolher Arquivo</label>
            </div>
          </div>






      
          {/* Botão para salvar o post (editar ou criar). */}
          <button className="save-button" type="submit">{userProfileId ? 'Salvar' : 'Criar'}</button>
          {/* Link para voltar para a listagem de posts. */}
          <Link to="/userProfile" >
            <button type="button" className="back-button">Voltar para Listagem</button>
          </Link>
        </form>
      </div>
    </div>
        </div>
  )
}

// Exporta o componente EditPost.
export default EditAjudante