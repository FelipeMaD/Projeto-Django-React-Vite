import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import logo from '../assets/logo.png'
import { TiSocialInstagram , TiSocialFacebook, } from "react-icons/ti";
import {FaXTwitter } from "react-icons/fa6";
import { FaReddit } from "react-icons/fa";
import { BiPlusMedical } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";

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
            <main className='main'>
                <div className='background'>

                </div>
                <div className="Main-content-area">
                    <div className='bg-icons left'>
                        <Link to="/pixels/create" className='link-middle-left'><BiPlusMedical  color='#AE3C56' size="80px" className="button"/></Link>
                    </div>
                    
                    <img className='logo-middle' src={logo} alt="" />
                    
                    <div className='bg-icons right'>
                        <Link to="/pixels/" className='link-middle-right'><BiSearchAlt2  color='#AE3C56' size="80px" className="button"/></Link>
                    </div>
                    
                </div>
               <div className='redes-container'>
                    <div className='lista-redes'>
                        <Link to="#" ><TiSocialInstagram size="35px" color="#131418" className='icon'/></Link>
                        <Link to="#"><TiSocialFacebook size="35px" color="#131418" className='icon'/></Link>
                        <Link to="#"><FaXTwitter size="35px" color="#131418" className='icon'/></Link>
                        <Link to="#"><FaReddit size="35px" color="#131418" className='icon'/></Link>
                    </div>
                        
                    
               </div>
            </main>

            
            
        </div>
    )
}

export default Home