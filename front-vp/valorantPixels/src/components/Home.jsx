import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home(){
    return(
        <div>
            <h1>Olá, Mundo</h1>
            <Link to="/pixels/create" className="create-button">Criar Novo Pixel</Link>
            <Link to="/pixels/" className="create-button">Listar Pixels</Link>
        </div>
    )
}

export default Home