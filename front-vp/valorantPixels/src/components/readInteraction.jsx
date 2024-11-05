// Importa os hooks useState e useEffect do React para gerenciar o estado e efeitos colaterais, respectivamente,
// o hook useParams do react-router-dom para obter parâmetros da URL,
// e o módulo api para fazer solicitações HTTP.
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'
import logo from '../assets/logo.png'

// Importa o arquivo de estilo CSS.
import '../styles/Home.css'

// Define o componente ReadPost.
function ReadInteraction() {
  // Obtém o parâmetro postId da URL.
  const { interactionId } = useParams()

  // Define estados para armazenar o título, conteúdo e imagem do post.
  const [comentario, setContent] = useState('')
  const [upload, setImage] = useState('')

  // Efeito que é executado quando o postId é alterado.
  useEffect(() => {
    // Faz uma solicitação GET para a API para obter os detalhes do post com o ID fornecido.
    api.get(`/interaction/${interactionId}/`)
      .then(response => {
        // Atualiza o estado com os detalhes do post obtidos da API.
        setContent(response.data.comentario)
        setImage(response.data.upload)
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes da interação', error)
      })
  }, [interactionId])

  // Retorna a interface do componente ReadPost.
  return (
    <div>
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
            <Link to="#" className='links-escolha'>top ajudantes</Link>
            <Link to="#" className='links-escolha'>comunidade</Link>
        </div>
        <div>
            <div></div>
            <Link to="#">Hi, joao</Link>
        </div>
    </nav>
    <div className="read-post-container">
      {/* Título da página */}
      <h1>Detalhes da Interação</h1>
      {/* Link para voltar para a lista de posts */}
      {/* Título do post */}
      <h2>{comentario}</h2>
      {/* Conteúdo do post */}
      {/* Imagem do post, se existir */}
      {upload && <img src={upload} alt="Imagem da interação" className="post-image" />}
    </div>
   </div>
  )
}

// Exporta o componente ReadPost.
export default ReadInteraction