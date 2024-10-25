// Importa o módulo axios para fazer solicitações HTTP e o URL base da API do arquivo de configuração.
import axios from 'axios'
import { API_URL } from '../config'

// Cria uma instância do Axios com a baseURL configurada para o URL da API e um timeout de 5000ms.
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
})

// Interceptador de solicitação: é executado antes de cada solicitação ser enviada.
api.interceptors.request.use(
  config => {
    // Recupera o token do armazenamento local.
    const token = localStorage.getItem('token')
    // Se um token existir, adiciona-o ao cabeçalho de autorização da solicitação.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    // Se houver um erro, rejeita a solicitação com o erro.
    return Promise.reject(error)
})

// Interceptador de resposta: é executado quando uma resposta é recebida.
api.interceptors.response.use(
  response => {
    // Se a resposta for bem-sucedida, retorna a resposta.
    return response
  },
  error => {
    // Se houver um erro na resposta...
    if (error.response && error.response.status === 401) {
      // ...e o erro for de token inválido (status 401), redireciona para a página de login.
      window.location.replace('/')
    }
    // Retorna o erro para que seja tratado pelo código que fez a solicitação.
    return Promise.reject(error)
})

// Exporta a instância do Axios configurada como a API padrão da aplicação.
export default api