import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      estacao: null,
      data: null,
      icone: null
    }
  }

  icones = {
    'Outono': 'fa-brands fa-canadian-maple-leaf',
    'Primavera': 'fa-solid fa-clover',
    'Verão': 'fa-solid umbrella-beach',
    'Inverno': 'fa-regular fa-snowflake'
  }

  obterEstacao = (data, latitude) => {
    const anoAtual = data.getFullYear()
    //21/06 
    const d1 = new Date(anoAtual, 5, 21)
    //24/09
    const d2 = new Date(anoAtual, 8, 24)
    //22/12
    const d3 = new Date(anoAtual, 11, 22)
    //21/03
    const d4 = new Date(anoAtual, 2, 21)
    const estouNoSul = latitude < 0 
    if(data >= d1 && data < d2)
      return estouNoSul ? 'Inverno' : 'Verão'
    if(data >= d2 && data < d3)
      return estouNoSul ? 'Primavera' : 'Outono'
    if (data > d3 || data < d4)
      return estouNoSul ? 'Verão' : 'Inverno'
    return estouNoSul ? 'Outono' : 'Primavera'
    
  }

  obterLocalizacao = () => {
    //1 Obter a localização do usuário
    window.navigator.geolocation.getCurrentPosition(position => {
      //2 Obter a data atual do sistema
      const dataAtual = new Date()
      //3 Obter a estação climática do usuário
      const estacao = this.obterEstacao(dataAtual, position.coords.latitude)
      //4 Obter o nome do ícone
      const icone = this.icones[estacao]
      //5 Usar a função setState (qualifique com this) atualizando o estado da aplicação
      //entregue um objeto à função setState 
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        icone: icone,
        estacao: estacao,
        data: dataAtual
      })
    })

  }
  render(){
    return(
      <div>
        Começando..
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)