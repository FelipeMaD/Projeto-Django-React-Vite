import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import logo from '../assets/logo.png'

function Home(){
    return(
        <div>
            <header className='header'>
                <div className='left-header'>
                    <Link to="/Home" className='home'><img src={logo} alt="" className='imagem' /></Link>
                    <a href="#"><p>Home</p></a>
                    <a href="#"><p>Sobre nós</p></a>
                </div>
                <div className='right-header'>
                    <a href="#"><p>Suporte</p></a>
                </div>
            </header>
            <nav className='navbar'>
                <div className='links-navbar'>
                    <Link to="#">agentes</Link>
                    <Link to="#">mapas</Link>
                    <Link to="#">top ajudantes</Link>
                    <Link to="#">comunidade</Link>
                </div>
                <div>
                    <div></div>
                    <Link to="#">Hi, joao</Link>
                </div>
            </nav>
            <main className='main'>
                <div className="Main-content-area">
                    <div>
                        <Link to="/pixels/create" className="create-button">Criar Novo Pixel</Link>
                    </div>
                    
                    <img className='logo-middle' src={logo} alt="" />
                    
                    <div>
                        <Link to="/pixels/" className="create-button">Listar Pixels</Link>
                    </div>
                    
                </div>
               
            </main>
            
            
        </div>
    )
}

export default Home