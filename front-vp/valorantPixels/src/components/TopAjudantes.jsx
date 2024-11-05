// Importa os hooks useState e useEffect do React para gerenciar o estado e efeitos colaterais, respectivamente,
// e o módulo api para fazer solicitações HTTP.
import { useState, useEffect } from 'react'
import api from '../api'
import { BiPlusMedical } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";


// Importa o componente Link do react-router-dom para navegação entre rotas.
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

// Importa o arquivo de estilo CSS.
import '../styles/TopAjudantes.css'
import '../styles/Home.css'

// Define o componente PostList.
function TopAjudantes() {
  // Define o estado para armazenar a lista de posts.
  const [userProfile, setUserProfile] = useState([])

  const handleDelete = async (userProfileId) => {
    try {
      // Faz uma solicitação DELETE para a API para excluir o post com o ID fornecido.
      await api.delete(`/userProfile/${userProfileId}/`)
      // Atualiza o estado removendo o post excluído da lista.
      const updatedUserProfile = userProfile.filter(userProfile => userProfile.id !== userProfileId)
      setUserProfile(updatedUserProfile)
      alert('Profile deletado com sucesso!')
    } catch (error) {
      console.error('Erro ao deletar profile:', error)
    }
  }

  // Efeito que é executado uma vez após a renderização inicial do componente.
  useEffect(() => {
    // Faz uma solicitação GET para a API para obter a lista de posts.
    api.get(`/userProfile/`)
      .then(response => {
        // Atualiza o estado com a lista de posts obtida da API.
        console.log('Resposta da API:', response.data)
        setUserProfile(response.data.results)
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error)
      })
  }, [])

  // Retorna a interface do componente PostList.
  return (
    <div className='master-div-ajudantes'>
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
                <div></div>
                <Link to="#">Hi, joao</Link>
            </div>
      </nav>
      <div className="ajudantes-list-container">
        {/* Cabeçalho da lista de posts com um botão para criar um novo post */}
        <div >
          <h1 id='titulo-ajudantes' >Top Ajudantes da comunidade</h1>
        </div>
        {/* Lista de posts */}
        <ul>
          {/* Mapeia cada post na lista de posts e renderiza um item de lista para cada um */}
          {userProfile.map(userProfile => (
            <li key={userProfile.id} className="post-item" id='ajudantes'>
              {/* Link para os detalhes do post */}
              {/* <Link to={`/userProfile/${userProfile.id}/detail`} className="post-link-name"></Link> */}
              {/* Botões de ação para editar e excluir o post */}
              <div id='info-ajudantes'>
                {userProfile.profile_picture && <img src={userProfile.profile_picture} alt="Imagem do Usurário" className="imagem-ajudante" />}
                <p>{userProfile.fraseEfeito}</p>
                <p>{userProfile.userPixels}</p>
              </div>
              <div>
                <button onClick={() => handleDelete(userProfile.id)} className="delete-button"><FaTrash /></button>
              </div>
             
              
            </li> 
          ))}
        </ul>
        <Link to = "/userProfile/create" className='criar-ajudante'> <BiPlusMedical  color='#AE3C56' size="40px" /></Link>
      </div>

     
    </div>
  )
}

// Exporta o componente PostList.
export default TopAjudantes